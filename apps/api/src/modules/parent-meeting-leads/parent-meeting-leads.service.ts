import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { QueryFailedError, Repository } from "typeorm";
import { MailService } from "../../common/mail/mail.service";
import type { Configuration } from "../../config/configuration";
import { CreateParentMeetingLeadDto } from "./dto/create-parent-meeting-lead.dto";
import { ParentMeetingLead } from "./entities/parent-meeting-lead.entity";

const POSTGRES_UNIQUE_VIOLATION = "23505";

const DUPLICATE_MESSAGE =
  "You're already registered for our monthly parent meeting. We'll send you the next session details by email.";

export interface ParentMeetingLeadResponse {
  id: string;
  parentName: string;
  email: string;
  phone: string;
  childName: string | null;
  childAge: number;
  questions: string | null;
  consentGivenAt: Date;
  createdAt: Date;
}

@Injectable()
export class ParentMeetingLeadsService {
  private readonly logger = new Logger(ParentMeetingLeadsService.name);

  constructor(
    @InjectRepository(ParentMeetingLead)
    private readonly leadsRepository: Repository<ParentMeetingLead>,
    private readonly mailService: MailService,
    private readonly configService: ConfigService<Configuration, true>,
  ) {}

  async create(
    createDto: CreateParentMeetingLeadDto,
  ): Promise<ParentMeetingLeadResponse> {
    if (!createDto.consent) {
      throw new BadRequestException("Parent consent is required to register.");
    }

    const email = createDto.email.trim().toLowerCase();
    const existing = await this.leadsRepository.findOne({ where: { email } });

    if (existing) {
      throw new ConflictException(DUPLICATE_MESSAGE);
    }

    const leadData = {
      parentName: createDto.parentName.trim(),
      email,
      phone: createDto.phone.trim(),
      childName: createDto.childName?.trim() ?? null,
      childAge: createDto.childAge,
      questions: createDto.questions?.trim() ?? null,
      consentGivenAt: new Date(),
    };

    try {
      const saved = await this.leadsRepository.save(
        this.leadsRepository.create(leadData),
      );

      this.dispatchConfirmationEmail(saved);

      return this.toResponse(saved);
    } catch (error) {
      if (this.isUniqueViolation(error)) {
        throw new ConflictException(DUPLICATE_MESSAGE);
      }

      this.logger.error(
        `Failed to create parent meeting lead: ${this.formatError(error)}`,
      );
      throw new InternalServerErrorException("Unable to submit registration");
    }
  }

  private dispatchConfirmationEmail(lead: ParentMeetingLead): void {
    void this.sendConfirmationEmail(lead).catch((error: unknown) => {
      this.logger.error(
        `Confirmation email failed for "${lead.email}": ${this.formatError(error)}`,
      );
    });
  }

  private async sendConfirmationEmail(lead: ParentMeetingLead): Promise<void> {
    const frontendUrl = this.configService.get("app.frontendUrl", {
      infer: true,
    });
    const assessmentUrl = `${frontendUrl.replace(/\/$/, "")}/assessment`;

    const html = `
      <p>Hi ${lead.parentName},</p>
      <p>Thank you for registering for BrainStack's <strong>Monthly Parent Meeting</strong>.</p>
      <p>You'll receive the meeting link before each session. We cover why coding matters for kids, how our courses work, and a live Q&amp;A for all your questions.</p>
      <p>Child age on file: ${lead.childAge}${lead.childName ? ` (${lead.childName})` : ""}</p>
      <p>While you wait, try our free <a href="${assessmentUrl}">Kid Readiness Assessment</a> to see how your child might benefit from our Scratch &amp; logic course.</p>
      <p>— The BrainStack Team</p>
    `;

    await this.mailService.sendMail({
      to: lead.email,
      subject: "You're registered — BrainStack Monthly Parent Meeting",
      html,
    });
  }

  private toResponse(lead: ParentMeetingLead): ParentMeetingLeadResponse {
    return {
      id: lead.id,
      parentName: lead.parentName,
      email: lead.email,
      phone: lead.phone,
      childName: lead.childName,
      childAge: lead.childAge,
      questions: lead.questions,
      consentGivenAt: lead.consentGivenAt,
      createdAt: lead.createdAt,
    };
  }

  private isUniqueViolation(error: unknown): boolean {
    if (!(error instanceof QueryFailedError)) {
      return false;
    }

    const driverError = error.driverError as { code?: string } | undefined;
    return driverError?.code === POSTGRES_UNIQUE_VIOLATION;
  }

  private formatError(error: unknown): string {
    return error instanceof Error ? error.message : String(error);
  }
}

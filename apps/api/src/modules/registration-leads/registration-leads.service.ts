import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MailService } from "../../common/mail/mail.service";
import type { Configuration } from "../../config/configuration";
import { CreateRegistrationLeadDto } from "./dto/create-registration-lead.dto";
import { RegistrationLead } from "./entities/registration-lead.entity";
import { buildWelcomeParentEmailHtml } from "./templates/welcome-parent-email.template";

export interface RegistrationLeadResponse {
  id: string;
  parentName: string;
  email: string;
  phone: string;
  childName: string;
  childAge: number;
  notes: string | null;
  createdAt: Date;
}

@Injectable()
export class RegistrationLeadsService {
  private readonly logger = new Logger(RegistrationLeadsService.name);

  constructor(
    @InjectRepository(RegistrationLead)
    private readonly leadsRepository: Repository<RegistrationLead>,
    private readonly mailService: MailService,
    private readonly configService: ConfigService<Configuration, true>,
  ) {}

  async create(
    createDto: CreateRegistrationLeadDto,
  ): Promise<RegistrationLeadResponse> {
    try {
      const lead = this.leadsRepository.create({
        parentName: createDto.parentName.trim(),
        email: createDto.email.trim().toLowerCase(),
        phone: createDto.phone.trim(),
        childName: createDto.childName.trim(),
        childAge: createDto.childAge,
        notes: createDto.notes?.trim() ?? null,
      });

      const saved = await this.leadsRepository.save(lead);

      this.dispatchWelcomeEmail(saved);

      return this.toResponse(saved);
    } catch (error) {
      this.logger.error(
        `Failed to create registration lead: ${this.formatError(error)}`,
      );
      throw new InternalServerErrorException("Unable to submit registration");
    }
  }

  private dispatchWelcomeEmail(lead: RegistrationLead): void {
    void this.sendWelcomeEmail(lead).catch((error: unknown) => {
      this.logger.error(
        `Background welcome email failed for lead "${lead.id}": ${this.formatError(error)}`,
      );
    });
  }

  private async sendWelcomeEmail(lead: RegistrationLead): Promise<void> {
    const frontendUrl = this.configService.get("app.frontendUrl", {
      infer: true,
    });
    const webinarUrl = `${frontendUrl.replace(/\/$/, "")}/webinar`;

    const html = buildWelcomeParentEmailHtml({
      parentName: lead.parentName,
      childName: lead.childName,
      childAge: lead.childAge,
      webinarUrl,
    });

    await this.mailService.sendMail({
      to: lead.email,
      subject: "Welcome to BrainStack — You're Invited to Our Parent Webinar!",
      html,
    });

    this.logger.log(`Welcome email dispatched to "${lead.email}"`);
  }

  private toResponse(lead: RegistrationLead): RegistrationLeadResponse {
    return {
      id: lead.id,
      parentName: lead.parentName,
      email: lead.email,
      phone: lead.phone,
      childName: lead.childName,
      childAge: lead.childAge,
      notes: lead.notes,
      createdAt: lead.createdAt,
    };
  }

  private formatError(error: unknown): string {
    return error instanceof Error ? error.message : String(error);
  }
}

import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { QueryFailedError, Repository } from "typeorm";
import { ClassSlotsService } from "../class-slots/class-slots.service";
import { MailService } from "../../common/mail/mail.service";
import type { Configuration } from "../../config/configuration";
import { CreateRegistrationLeadDto } from "./dto/create-registration-lead.dto";
import { RegistrationLead } from "./entities/registration-lead.entity";
import type {
  Gender,
  MediumOfInstruction,
  PreferredLanguage,
} from "./entities/registration-lead.entity";
import { buildWelcomeParentEmailHtml } from "./templates/welcome-parent-email.template";

const POSTGRES_UNIQUE_VIOLATION = "23505";

const DUPLICATE_LEAD_MESSAGE =
  "Thanks! We already have your registration on file. Our team will follow up with you soon.";

export interface RegistrationLeadResponse {
  id: string;
  parentName: string;
  email: string;
  phone: string;
  childName: string;
  childAge: number;
  mediumOfInstruction: MediumOfInstruction;
  gender: Gender;
  preferredLanguage: PreferredLanguage;
  hasDevice: boolean;
  classSlotId: string;
  notes: string | null;
  parentalConsent: boolean;
  consentGivenAt: Date;
  createdAt: Date;
}

@Injectable()
export class RegistrationLeadsService {
  private readonly logger = new Logger(RegistrationLeadsService.name);

  constructor(
    @InjectRepository(RegistrationLead)
    private readonly leadsRepository: Repository<RegistrationLead>,
    private readonly classSlotsService: ClassSlotsService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService<Configuration, true>,
  ) {}

  async create(
    createDto: CreateRegistrationLeadDto,
  ): Promise<RegistrationLeadResponse> {
    const leadData = this.normalizeCreateDto(createDto);

    const existingLead = await this.findByEmail(leadData.email);

    if (existingLead) {
      throw new ConflictException(DUPLICATE_LEAD_MESSAGE);
    }

    await this.classSlotsService.validateSlotForRegistration(
      leadData.classSlotId,
      leadData.childAge,
    );

    try {
      const saved = await this.leadsRepository.save(
        this.leadsRepository.create(leadData),
      );

      this.dispatchWelcomeEmail(saved);

      return this.toResponse(saved);
    } catch (error) {
      if (this.isUniqueViolation(error)) {
        throw new ConflictException(DUPLICATE_LEAD_MESSAGE);
      }

      this.logger.error(
        `Failed to create registration lead: ${this.formatError(error)}`,
      );
      throw new InternalServerErrorException("Unable to submit registration");
    }
  }

  private normalizeCreateDto(createDto: CreateRegistrationLeadDto): {
    parentName: string;
    email: string;
    phone: string;
    childName: string;
    childAge: number;
    mediumOfInstruction: MediumOfInstruction;
    gender: Gender;
    preferredLanguage: PreferredLanguage;
    hasDevice: boolean;
    classSlotId: string;
    notes: string | null;
    parentalConsent: boolean;
    consentGivenAt: Date;
  } {
    return {
      parentName: createDto.parentName.trim(),
      email: createDto.email.trim().toLowerCase(),
      phone: createDto.phone.trim(),
      childName: createDto.childName.trim(),
      childAge: createDto.childAge,
      mediumOfInstruction: createDto.mediumOfInstruction,
      gender: createDto.gender,
      preferredLanguage: createDto.preferredLanguage,
      hasDevice: createDto.hasDevice,
      classSlotId: createDto.classSlotId,
      notes: createDto.notes?.trim() ?? null,
      parentalConsent: true,
      consentGivenAt: new Date(),
    };
  }

  private async findByEmail(email: string): Promise<RegistrationLead | null> {
    try {
      return await this.leadsRepository.findOne({
        where: { email },
      });
    } catch (error) {
      this.logger.error(
        `Failed to find registration lead by email "${email}": ${this.formatError(error)}`,
      );
      return null;
    }
  }

  private isUniqueViolation(error: unknown): boolean {
    if (!(error instanceof QueryFailedError)) {
      return false;
    }

    const driverError = error.driverError as { code?: string } | undefined;
    return driverError?.code === POSTGRES_UNIQUE_VIOLATION;
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
      mediumOfInstruction: lead.mediumOfInstruction,
      gender: lead.gender,
      preferredLanguage: lead.preferredLanguage,
      hasDevice: lead.hasDevice,
      classSlotId: lead.classSlotId,
      notes: lead.notes,
      parentalConsent: lead.parentalConsent,
      consentGivenAt: lead.consentGivenAt,
      createdAt: lead.createdAt,
    };
  }

  private formatError(error: unknown): string {
    return error instanceof Error ? error.message : String(error);
  }
}

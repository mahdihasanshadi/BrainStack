import {
  Equals,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
} from "class-validator";
import {
  Gender,
  MediumOfInstruction,
  PreferredLanguage,
} from "../entities/registration-lead.entity";

export class CreateRegistrationLeadDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  parentName!: string;

  @IsEmail()
  @MaxLength(255)
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  phone!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  childName!: string;

  @IsInt()
  @Min(6, { message: "childAge must be at least 6" })
  @Max(14, { message: "childAge must be 14 or less" })
  childAge!: number;

  @IsEnum(MediumOfInstruction, {
    message:
      "mediumOfInstruction must be one of: bangla_medium, english_medium, english_version, madrasah",
  })
  mediumOfInstruction!: MediumOfInstruction;

  @IsEnum(Gender, {
    message: "gender must be one of: male, female",
  })
  gender!: Gender;

  @IsEnum(PreferredLanguage, {
    message: "preferredLanguage must be one of: english, bangla",
  })
  preferredLanguage!: PreferredLanguage;

  @IsBoolean({ message: "hasDevice is required" })
  hasDevice!: boolean;

  @IsUUID(undefined, { message: "classSlotId must be a valid UUID" })
  classSlotId!: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  notes?: string;

  @IsBoolean()
  @Equals(true, {
    message: "Parental consent is required to submit registration",
  })
  parentalConsent!: boolean;
}

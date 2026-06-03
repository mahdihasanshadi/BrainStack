import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from "class-validator";

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
  @Min(1)
  @Max(18)
  childAge!: number;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  notes?: string;
}

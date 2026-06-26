import { Type } from "class-transformer";
import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from "class-validator";

export class CreateParentMeetingLeadDto {
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

  @IsOptional()
  @IsString()
  @MaxLength(255)
  childName?: string;

  @Type(() => Number)
  @IsInt()
  @Min(5)
  @Max(16)
  childAge!: number;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  questions?: string;

  @IsBoolean()
  consent!: boolean;
}

import { Type } from "class-transformer";
import {
  IsEmail,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from "class-validator";

export class SubmitKidAssessmentDto {
  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  parentEmail?: string;

  @Type(() => Number)
  @IsInt()
  @Min(5)
  @Max(16)
  childAge!: number;

  @IsObject()
  answers!: Record<string, string>;
}

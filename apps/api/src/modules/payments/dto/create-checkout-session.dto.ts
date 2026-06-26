import { Type } from "class-transformer";
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

export class CreateCheckoutSessionDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  courseSlug!: string;

  @IsEmail()
  @MaxLength(255)
  email!: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  phone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  parentName?: string;

  @IsOptional()
  @IsIn(["card", "bkash", "nagad"])
  paymentMethod?: "card" | "bkash" | "nagad";
}

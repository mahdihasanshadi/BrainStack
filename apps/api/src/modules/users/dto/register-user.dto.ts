import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { UserRole } from "../entities/user.entity";

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  fullName!: string;

  @IsEmail()
  @MaxLength(255)
  email!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  phone!: string;

  @IsOptional()
  @IsEnum(UserRole, {
    message: "role must be one of: parent, student, admin",
  })
  role?: UserRole;
}

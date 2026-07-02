import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  /** Email address or admin username (`admin`). */
  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}

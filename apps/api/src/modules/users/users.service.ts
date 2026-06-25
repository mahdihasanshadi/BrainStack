import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcryptjs";
import { QueryFailedError, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { RegisterUserDto } from "./dto/register-user.dto";
import { User, UserRole } from "./entities/user.entity";

import type { SafeUser } from "../auth/interfaces/auth-response.interface";

const POSTGRES_UNIQUE_VIOLATION = "23505";
const BCRYPT_SALT_ROUNDS = 12;

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    return this.create({
      fullName: registerUserDto.fullName,
      email: registerUserDto.email,
      password: registerUserDto.password,
      phone: registerUserDto.phone,
      role: UserRole.PARENT,
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const normalizedEmail = this.normalizeEmail(createUserDto.email);

    try {
      const passwordHash = await bcrypt.hash(
        createUserDto.password,
        BCRYPT_SALT_ROUNDS,
      );

      const user = this.usersRepository.create({
        fullName: createUserDto.fullName.trim(),
        email: normalizedEmail,
        passwordHash,
        phone: createUserDto.phone.trim(),
        role: createUserDto.role,
        isVerified: false,
        onboardingCompleted: false,
        assessmentResult: null,
      });

      return await this.usersRepository.save(user);
    } catch (error) {
      if (this.isUniqueViolation(error)) {
        throw new ConflictException("A user with this email already exists");
      }

      this.logger.error(
        `Failed to create user for email "${normalizedEmail}": ${this.formatError(error)}`,
      );
      throw new InternalServerErrorException("Unable to create user");
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    const normalizedEmail = this.normalizeEmail(email);

    if (!normalizedEmail) {
      return null;
    }

    try {
      return await this.usersRepository.findOne({
        where: { email: normalizedEmail },
      });
    } catch (error) {
      this.logger.error(
        `Failed to find user by email "${normalizedEmail}": ${this.formatError(error)}`,
      );
      return null;
    }
  }

  async findById(id: string): Promise<User | null> {
    if (!id?.trim()) {
      return null;
    }

    try {
      return await this.usersRepository.findOne({
        where: { id: id.trim() },
      });
    } catch (error) {
      this.logger.error(
        `Failed to find user by id "${id}": ${this.formatError(error)}`,
      );
      return null;
    }
  }

  toSafeUser(user: User): SafeUser {
    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isVerified: user.isVerified,
      onboardingCompleted: user.onboardingCompleted,
      assessmentResult: user.assessmentResult,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  private normalizeEmail(email: string): string {
    return email?.trim().toLowerCase() ?? "";
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

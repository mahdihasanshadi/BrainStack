import {
  BadRequestException,
  Injectable,
  Logger,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ClassSlot } from "./entities/class-slot.entity";
import type {
  ClassSlotDatesResponse,
  ClassSlotTimesResponse,
} from "./interfaces/class-slot-responses.interface";

const UPCOMING_WEEKS = 4;
const DAYS_IN_WINDOW = UPCOMING_WEEKS * 7;

@Injectable()
export class ClassSlotsService {
  private readonly logger = new Logger(ClassSlotsService.name);

  constructor(
    @InjectRepository(ClassSlot)
    private readonly classSlotsRepository: Repository<ClassSlot>,
  ) {}

  async getUpcomingDates(childAge: number): Promise<ClassSlotDatesResponse> {
    const slots = await this.findActiveSlotsForAge(childAge);
    const matchingDays = new Set(slots.map((slot) => slot.dayOfWeek));
    const dates: string[] = [];
    const today = this.startOfLocalDay(new Date());

    for (let offset = 0; offset < DAYS_IN_WINDOW; offset++) {
      const candidate = new Date(today);
      candidate.setDate(today.getDate() + offset);

      if (matchingDays.has(candidate.getDay())) {
        dates.push(this.formatDateOnly(candidate));
      }
    }

    return { dates };
  }

  async getTimesForDate(
    childAge: number,
    date: string,
  ): Promise<ClassSlotTimesResponse> {
    const parsedDate = this.parseDateOnly(date);

    if (!parsedDate) {
      throw new BadRequestException(
        "date must be a valid calendar date in YYYY-MM-DD format",
      );
    }

    const today = this.startOfLocalDay(new Date());

    if (parsedDate < today) {
      throw new BadRequestException("date must be today or later");
    }

    const dayOfWeek = parsedDate.getDay();
    const slots = await this.findActiveSlotsForAge(childAge, dayOfWeek);

    if (slots.length === 0) {
      throw new BadRequestException(
        "No class times are available for this age on the selected date",
      );
    }

    return {
      date,
      slots: slots.map((slot) => ({
        id: slot.id,
        startTime: slot.startTime,
        endTime: slot.endTime,
      })),
    };
  }

  async validateSlotForRegistration(
    classSlotId: string,
    childAge: number,
  ): Promise<ClassSlot> {
    const slot = await this.classSlotsRepository.findOne({
      where: { id: classSlotId },
    });

    if (!slot || !slot.isActive) {
      throw new BadRequestException(
        "The selected class time is not available",
      );
    }

    if (childAge < slot.minAge || childAge > slot.maxAge) {
      throw new BadRequestException(
        "The selected class time does not match the child's age",
      );
    }

    return slot;
  }

  private async findActiveSlotsForAge(
    childAge: number,
    dayOfWeek?: number,
  ): Promise<ClassSlot[]> {
    try {
      const query = this.classSlotsRepository
        .createQueryBuilder("slot")
        .where("slot.isActive = :isActive", { isActive: true })
        .andWhere("slot.minAge <= :childAge", { childAge })
        .andWhere("slot.maxAge >= :childAge", { childAge })
        .orderBy("slot.startTime", "ASC");

      if (dayOfWeek !== undefined) {
        query.andWhere("slot.dayOfWeek = :dayOfWeek", { dayOfWeek });
      }

      return await query.getMany();
    } catch (error) {
      this.logger.error(
        `Failed to find class slots for age ${childAge}: ${this.formatError(error)}`,
      );
      return [];
    }
  }

  private parseDateOnly(value: string): Date | null {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

    if (!match) {
      return null;
    }

    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    const parsed = new Date(year, month - 1, day);

    if (
      parsed.getFullYear() !== year ||
      parsed.getMonth() !== month - 1 ||
      parsed.getDate() !== day
    ) {
      return null;
    }

    return this.startOfLocalDay(parsed);
  }

  private startOfLocalDay(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  private formatDateOnly(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  private formatError(error: unknown): string {
    return error instanceof Error ? error.message : String(error);
  }
}

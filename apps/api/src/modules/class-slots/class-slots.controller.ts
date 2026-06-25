import { Controller, Get, Query } from "@nestjs/common";
import { ClassSlotsService } from "./class-slots.service";
import { QueryClassSlotDatesDto } from "./dto/query-class-slot-dates.dto";
import { QueryClassSlotTimesDto } from "./dto/query-class-slot-times.dto";
import type {
  ClassSlotDatesResponse,
  ClassSlotTimesResponse,
} from "./interfaces/class-slot-responses.interface";

@Controller("class-slots")
export class ClassSlotsController {
  constructor(private readonly classSlotsService: ClassSlotsService) {}

  @Get("dates")
  getDates(
    @Query() query: QueryClassSlotDatesDto,
  ): Promise<ClassSlotDatesResponse> {
    return this.classSlotsService.getUpcomingDates(query.childAge);
  }

  @Get("times")
  getTimes(
    @Query() query: QueryClassSlotTimesDto,
  ): Promise<ClassSlotTimesResponse> {
    return this.classSlotsService.getTimesForDate(query.childAge, query.date);
  }
}

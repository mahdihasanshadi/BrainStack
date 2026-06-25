import { Controller, Get, Param } from "@nestjs/common";
import { CoursesService } from "./courses.service";
import type {
  CourseDetailResponse,
  CourseSummaryResponse,
} from "./interfaces/course-responses.interface";

@Controller("courses")
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  findAll(): Promise<CourseSummaryResponse[]> {
    return this.coursesService.findAllSummaries();
  }

  @Get(":slug")
  findBySlug(@Param("slug") slug: string): Promise<CourseDetailResponse> {
    return this.coursesService.findBySlug(slug);
  }
}

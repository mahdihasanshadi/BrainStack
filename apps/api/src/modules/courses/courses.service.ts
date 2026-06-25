import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CourseLevel } from "./entities/course-level.entity";
import { Course } from "./entities/course.entity";
import type {
  CourseDetailResponse,
  CourseLevelResponse,
  CourseSummaryResponse,
} from "./interfaces/course-responses.interface";

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
  ) {}

  async findAllSummaries(): Promise<CourseSummaryResponse[]> {
    const courses = await this.coursesRepository.find({
      order: { displayOrder: "ASC" },
    });

    return courses.map((course) => this.toSummary(course));
  }

  async findBySlug(slug: string): Promise<CourseDetailResponse> {
    const course = await this.coursesRepository.findOne({
      where: { slug },
      relations: { levels: true },
    });

    if (!course) {
      throw new NotFoundException(`Course with slug "${slug}" was not found`);
    }

    const levels = [...course.levels].sort(
      (left, right) => left.levelNumber - right.levelNumber,
    );

    return {
      ...this.toSummary(course),
      levels: levels.map((level) => this.toLevel(level)),
    };
  }

  private toSummary(course: Course): CourseSummaryResponse {
    return {
      id: course.id,
      slug: course.slug,
      title: course.title,
      ageMin: course.ageMin,
      ageMax: course.ageMax,
      shortDescription: course.shortDescription,
      durationMonths: course.durationMonths,
      displayOrder: course.displayOrder,
    };
  }

  private toLevel(level: CourseLevel): CourseLevelResponse {
    return {
      id: level.id,
      levelNumber: level.levelNumber,
      title: level.title,
      toolName: level.toolName,
      description: level.description,
      finalOutcome: level.finalOutcome,
      durationMonths: level.durationMonths,
      learningOutcomes: level.learningOutcomes,
    };
  }
}

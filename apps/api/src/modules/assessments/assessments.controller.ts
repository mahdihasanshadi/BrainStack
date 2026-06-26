import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { RateLimitRegistrationLeads } from "../../common/decorators/rate-limit.decorator";
import { SubmitKidAssessmentDto } from "./dto/submit-kid-assessment.dto";
import {
  AssessmentsService,
  KidAssessmentResponse,
} from "./assessments.service";

@Controller("assessments")
export class AssessmentsController {
  constructor(private readonly assessmentsService: AssessmentsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @RateLimitRegistrationLeads()
  submit(
    @Body() dto: SubmitKidAssessmentDto,
  ): Promise<KidAssessmentResponse> {
    return this.assessmentsService.submit(dto);
  }
}

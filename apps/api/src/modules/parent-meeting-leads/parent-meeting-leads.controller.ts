import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { RateLimitRegistrationLeads } from "../../common/decorators/rate-limit.decorator";
import { CreateParentMeetingLeadDto } from "./dto/create-parent-meeting-lead.dto";
import {
  ParentMeetingLeadResponse,
  ParentMeetingLeadsService,
} from "./parent-meeting-leads.service";

@Controller("parent-meeting-leads")
export class ParentMeetingLeadsController {
  constructor(
    private readonly parentMeetingLeadsService: ParentMeetingLeadsService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @RateLimitRegistrationLeads()
  create(
    @Body() createDto: CreateParentMeetingLeadDto,
  ): Promise<ParentMeetingLeadResponse> {
    return this.parentMeetingLeadsService.create(createDto);
  }
}

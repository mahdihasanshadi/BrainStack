import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { CreateRegistrationLeadDto } from "./dto/create-registration-lead.dto";
import {
  RegistrationLeadResponse,
  RegistrationLeadsService,
} from "./registration-leads.service";

@Controller("registration-leads")
export class RegistrationLeadsController {
  constructor(
    private readonly registrationLeadsService: RegistrationLeadsService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createDto: CreateRegistrationLeadDto,
  ): Promise<RegistrationLeadResponse> {
    return this.registrationLeadsService.create(createDto);
  }
}

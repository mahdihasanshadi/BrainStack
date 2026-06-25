import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClassSlotsModule } from "../class-slots/class-slots.module";
import { RegistrationLead } from "./entities/registration-lead.entity";
import { RegistrationLeadsController } from "./registration-leads.controller";
import { RegistrationLeadsService } from "./registration-leads.service";

@Module({
  imports: [TypeOrmModule.forFeature([RegistrationLead]), ClassSlotsModule],
  controllers: [RegistrationLeadsController],
  providers: [RegistrationLeadsService],
})
export class RegistrationLeadsModule {}

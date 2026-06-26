import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MailModule } from "../../common/mail/mail.module";
import { ParentMeetingLead } from "./entities/parent-meeting-lead.entity";
import { ParentMeetingLeadsController } from "./parent-meeting-leads.controller";
import { ParentMeetingLeadsService } from "./parent-meeting-leads.service";

@Module({
  imports: [TypeOrmModule.forFeature([ParentMeetingLead]), MailModule],
  controllers: [ParentMeetingLeadsController],
  providers: [ParentMeetingLeadsService],
  exports: [ParentMeetingLeadsService],
})
export class ParentMeetingLeadsModule {}

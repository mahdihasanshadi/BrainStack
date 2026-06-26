import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Course } from "../courses/entities/course.entity";
import { CoursePurchase } from "./entities/course-purchase.entity";
import { PaymentsController } from "./payments.controller";
import { PaymentsService } from "./payments.service";

@Module({
  imports: [TypeOrmModule.forFeature([Course, CoursePurchase])],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}

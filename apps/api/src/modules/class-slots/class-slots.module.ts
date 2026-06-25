import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClassSlotsController } from "./class-slots.controller";
import { ClassSlotsService } from "./class-slots.service";
import { ClassSlot } from "./entities/class-slot.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ClassSlot])],
  controllers: [ClassSlotsController],
  providers: [ClassSlotsService],
  exports: [ClassSlotsService],
})
export class ClassSlotsModule {}

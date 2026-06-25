import { Type } from "class-transformer";
import { IsInt } from "class-validator";

export class QueryClassSlotDatesDto {
  @Type(() => Number)
  @IsInt({ message: "childAge must be an integer" })
  childAge!: number;
}

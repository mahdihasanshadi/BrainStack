import { Type } from "class-transformer";
import { IsInt, Matches } from "class-validator";

export class QueryClassSlotTimesDto {
  @Type(() => Number)
  @IsInt({ message: "childAge must be an integer" })
  childAge!: number;

  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: "date must be a valid calendar date in YYYY-MM-DD format",
  })
  date!: string;
}

import { Controller, Get, Res } from "@nestjs/common";
import type { Response } from "express";
import { HealthService } from "./health.service";
import type { HealthResponse } from "./interfaces/health-response.interface";

@Controller("health")
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  async check(@Res({ passthrough: true }) res: Response): Promise<HealthResponse> {
    const result = await this.healthService.check();
    res.status(result.httpStatus);
    return result.body;
  }
}

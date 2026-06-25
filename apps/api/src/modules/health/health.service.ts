import { Injectable } from "@nestjs/common";
import {
  HealthCheckError,
  HealthIndicatorResult,
  TypeOrmHealthIndicator,
} from "@nestjs/terminus";
import type { HealthResponse } from "./interfaces/health-response.interface";
import { RedisHealthIndicator } from "./redis.health";

export interface HealthCheckResult {
  body: HealthResponse;
  httpStatus: 200 | 503;
}

@Injectable()
export class HealthService {
  constructor(
    private readonly db: TypeOrmHealthIndicator,
    private readonly redis: RedisHealthIndicator,
  ) {}

  async check(): Promise<HealthCheckResult> {
    const db = await this.resolveIndicator(() => this.db.pingCheck("db"));
    const redis = await this.resolveIndicator(() => this.redis.isHealthy("redis"));
    const allUp = db === "up" && redis === "up";

    return {
      body: {
        status: allUp ? "ok" : "error",
        db,
        redis,
      },
      httpStatus: allUp ? 200 : 503,
    };
  }

  private async resolveIndicator(
    check: () => Promise<HealthIndicatorResult>,
  ): Promise<"up" | "down"> {
    try {
      const result = await check();
      return this.isIndicatorUp(result);
    } catch (error) {
      if (error instanceof HealthCheckError) {
        return this.isIndicatorUp(error.causes);
      }

      return "down";
    }
  }

  private isIndicatorUp(result: HealthIndicatorResult): "up" | "down" {
    const entry = Object.values(result)[0] as { status?: string } | undefined;
    return entry?.status === "up" ? "up" : "down";
  }
}

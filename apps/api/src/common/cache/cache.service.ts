import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Redis from "ioredis";
import type { Configuration } from "../../config/configuration";

@Injectable()
export class CacheService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(CacheService.name);
  private client: Redis | null = null;
  private defaultTtlSeconds = 3600;
  private isAvailable = false;
  private memoryCache = new Map<string, { value: string; expiresAt: number }>();

  constructor(
    private readonly configService: ConfigService<Configuration, true>,
  ) {}

  async onModuleInit(): Promise<void> {
    const redisUrl = this.configService.get("redis.url", { infer: true });
    this.defaultTtlSeconds = this.configService.get("redis.defaultTtlSeconds", {
      infer: true,
    });

    this.client = new Redis(redisUrl, {
      maxRetriesPerRequest: 1,
      enableOfflineQueue: false,
      lazyConnect: true,
    });

    this.client.on("connect", () => {
      this.isAvailable = true;
      this.logger.log("Redis connection established");
    });

    this.client.on("ready", () => {
      this.isAvailable = true;
    });

    this.client.on("error", (error: Error) => {
      this.isAvailable = false;
      this.logger.warn(`Redis error: ${error.message}`);
    });

    this.client.on("close", () => {
      this.isAvailable = false;
    });

    try {
      await this.client.connect();
    } catch (error) {
      this.isAvailable = false;
      this.logger.warn(
        `Redis unavailable at startup: ${this.formatError(error)}`,
      );
    }
  }

  async onModuleDestroy(): Promise<void> {
    if (!this.client) {
      return;
    }

    try {
      await this.client.quit();
    } catch (error) {
      this.logger.warn(`Redis shutdown error: ${this.formatError(error)}`);
    } finally {
      this.client = null;
      this.isAvailable = false;
    }
  }

  async get<T>(key: string): Promise<T | null> {
    if (!this.canUseRedis()) {
      const entry = this.memoryCache.get(key);
      if (!entry) {
        return null;
      }
      if (Date.now() > entry.expiresAt) {
        this.memoryCache.delete(key);
        return null;
      }
      return JSON.parse(entry.value) as T;
    }

    try {
      const raw = await this.client!.get(key);

      if (raw === null) {
        return null;
      }

      return JSON.parse(raw) as T;
    } catch (error) {
      this.logger.warn(
        `Cache get failed for key "${key}": ${this.formatError(error)}`,
      );
      return null;
    }
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    const serialized = JSON.stringify(value);
    const ttlSeconds = ttl ?? this.defaultTtlSeconds;

    if (!this.canUseRedis()) {
      const expiresAt = Date.now() + (ttlSeconds * 1000);
      this.memoryCache.set(key, { value: serialized, expiresAt });
      return;
    }

    try {
      await this.client!.set(key, serialized, "EX", ttlSeconds);
    } catch (error) {
      this.logger.warn(
        `Cache set failed for key "${key}": ${this.formatError(error)}`,
      );
    }
  }

  async del(key: string): Promise<void> {
    if (!this.canUseRedis()) {
      this.memoryCache.delete(key);
      return;
    }

    try {
      await this.client!.del(key);
    } catch (error) {
      this.logger.warn(
        `Cache del failed for key "${key}": ${this.formatError(error)}`,
      );
    }
  }

  async ping(): Promise<boolean> {
    if (!this.client || this.client.status !== "ready") {
      return false;
    }

    try {
      const response = await this.client.ping();
      return response === "PONG";
    } catch (error) {
      this.logger.warn(`Redis ping failed: ${this.formatError(error)}`);
      return false;
    }
  }

  async invalidateByPrefix(prefix: string): Promise<void> {
    if (!this.canUseRedis()) {
      return;
    }

    const pattern = `${prefix}*`;

    try {
      let cursor = "0";

      do {
        const [nextCursor, keys] = await this.client!.scan(
          cursor,
          "MATCH",
          pattern,
          "COUNT",
          100,
        );

        cursor = nextCursor;

        if (keys.length > 0) {
          await this.client!.del(...keys);
        }
      } while (cursor !== "0");
    } catch (error) {
      this.logger.warn(
        `Cache invalidateByPrefix failed for prefix "${prefix}": ${this.formatError(error)}`,
      );
    }
  }

  private canUseRedis(): boolean {
    if (!this.client) {
      return false;
    }

    if (!this.isAvailable && this.client.status !== "ready") {
      return false;
    }

    return true;
  }

  private formatError(error: unknown): string {
    return error instanceof Error ? error.message : String(error);
  }
}

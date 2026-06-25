import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";
import type { Configuration } from "../../config/configuration";
import {
  THROTTLE_LOGIN,
  THROTTLE_REGISTER,
  THROTTLE_REGISTRATION_LEADS,
  THROTTLE_TOO_MANY_REQUESTS_MESSAGE,
} from "../../config/throttle.defaults";

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Configuration, true>) => {
        const throttle = configService.get("throttle", { infer: true });

        return {
          errorMessage: THROTTLE_TOO_MANY_REQUESTS_MESSAGE,
          throttlers: [
            {
              name: THROTTLE_LOGIN,
              ttl: throttle.login.ttlMs,
              limit: throttle.login.limit,
            },
            {
              name: THROTTLE_REGISTER,
              ttl: throttle.register.ttlMs,
              limit: throttle.register.limit,
            },
            {
              name: THROTTLE_REGISTRATION_LEADS,
              ttl: throttle.registrationLeads.ttlMs,
              limit: throttle.registrationLeads.limit,
            },
          ],
        };
      },
    }),
  ],
  exports: [ThrottlerModule],
})
export class ThrottleModule {}

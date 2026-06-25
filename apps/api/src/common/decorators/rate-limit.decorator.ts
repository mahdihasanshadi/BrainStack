import { applyDecorators, UseGuards } from "@nestjs/common";
import {
  SkipThrottle,
  Throttle,
  ThrottlerGuard,
} from "@nestjs/throttler";
import {
  THROTTLE_LOGIN,
  THROTTLE_NAMES,
  THROTTLE_REGISTER,
  THROTTLE_REGISTRATION_LEADS,
} from "../../config/throttle.defaults";

function skipAllExcept(activeThrottler: string) {
  return THROTTLE_NAMES.reduce<Record<string, boolean>>((skips, name) => {
    if (name !== activeThrottler) {
      skips[name] = true;
    }

    return skips;
  }, {});
}

export const RateLimitLogin = () =>
  applyDecorators(
    UseGuards(ThrottlerGuard),
    SkipThrottle(skipAllExcept(THROTTLE_LOGIN)),
    Throttle({ [THROTTLE_LOGIN]: {} }),
  );

export const RateLimitRegister = () =>
  applyDecorators(
    UseGuards(ThrottlerGuard),
    SkipThrottle(skipAllExcept(THROTTLE_REGISTER)),
    Throttle({ [THROTTLE_REGISTER]: {} }),
  );

export const RateLimitRegistrationLeads = () =>
  applyDecorators(
    UseGuards(ThrottlerGuard),
    SkipThrottle(skipAllExcept(THROTTLE_REGISTRATION_LEADS)),
    Throttle({ [THROTTLE_REGISTRATION_LEADS]: {} }),
  );

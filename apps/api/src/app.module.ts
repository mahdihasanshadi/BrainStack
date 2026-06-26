import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import configuration from "./config/configuration";
import { environmentValidationSchema } from "./config/environment.validation";
import { CacheModule } from "./common/cache/cache.module";
import { ThrottleModule } from "./common/throttle/throttle.module";
import { MailModule } from "./common/mail/mail.module";
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from "./modules/auth/auth.module";
import { AdminModule } from "./modules/admin/admin.module";
import { ClassSlotsModule } from "./modules/class-slots/class-slots.module";
import { CoursesModule } from "./modules/courses/courses.module";
import { HealthModule } from "./modules/health/health.module";
import { RegistrationLeadsModule } from "./modules/registration-leads/registration-leads.module";
import { ParentMeetingLeadsModule } from "./modules/parent-meeting-leads/parent-meeting-leads.module";
import { AssessmentsModule } from "./modules/assessments/assessments.module";
import { PaymentsModule } from "./modules/payments/payments.module";
import { UsersModule } from "./modules/users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: environmentValidationSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
    }),
    DatabaseModule,
    ThrottleModule,
    CacheModule,
    MailModule,
    UsersModule,
    AuthModule,
    AdminModule,
    ClassSlotsModule,
    CoursesModule,
    HealthModule,
    RegistrationLeadsModule,
    ParentMeetingLeadsModule,
    AssessmentsModule,
    PaymentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

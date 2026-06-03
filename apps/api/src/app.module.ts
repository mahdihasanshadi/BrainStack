import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import configuration from "./config/configuration";
import { environmentValidationSchema } from "./config/environment.validation";
import { CacheModule } from "./common/cache/cache.module";
import { MailModule } from "./common/mail/mail.module";
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from "./modules/auth/auth.module";
import { RegistrationLeadsModule } from "./modules/registration-leads/registration-leads.module";
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
    CacheModule,
    MailModule,
    UsersModule,
    AuthModule,
    RegistrationLeadsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

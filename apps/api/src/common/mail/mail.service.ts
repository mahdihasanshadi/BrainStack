import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import type { Configuration } from "../../config/configuration";

export interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class MailService implements OnModuleInit {
  private readonly logger = new Logger(MailService.name);
  private transporter: Transporter | null = null;
  private fromAddress = "";

  constructor(
    private readonly configService: ConfigService<Configuration, true>,
  ) {}

  onModuleInit(): void {
    const smtp = this.configService.get("smtp", { infer: true });
    this.fromAddress = smtp.from;

    this.transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.port === 465,
      auth: {
        user: smtp.user,
        pass: smtp.pass,
      },
    });
  }

  async sendMail(options: SendMailOptions): Promise<void> {
    if (!this.transporter) {
      this.logger.error("Mail transporter is not initialized");
      return;
    }

    try {
      await this.transporter.sendMail({
        from: this.fromAddress,
        to: options.to,
        subject: options.subject,
        html: options.html,
      });
    } catch (error) {
      this.logger.error(
        `Failed to send email to "${options.to}": ${this.formatError(error)}`,
      );
      throw error;
    }
  }

  private formatError(error: unknown): string {
    return error instanceof Error ? error.message : String(error);
  }
}

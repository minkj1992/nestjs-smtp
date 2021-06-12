require('dotenv').config();

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { CsvModule } from './csv/csv.module';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        pool: true,
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_ID, // generated ethereal user
          pass: process.env.EMAIL_PASS, // generated ethereal password
        },
      },
      defaults: {
        from: process.env.MAIL_USER || '"nest-modules" <teamnexters@gmail.com>', // outgoing email ID
      },

      template: {
        dir: process.cwd() + '/template/',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),

    CsvModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

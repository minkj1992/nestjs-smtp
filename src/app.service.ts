import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { CsvService, ParsedData } from './csv/csv.service';
import { RealCsvEntity } from './csv/csv.entity';

@Injectable()
export class AppService {
  csvStream: fs.ReadStream;
  constructor(
    private readonly mailerService: MailerService,
    private readonly csvService: CsvService,
  ) {
    this.csvStream = fs.createReadStream('./src/real.csv');
  }

  getHello(): string {
    return 'Hello World!';
  }

  async taskJob(user: RealCsvEntity, template) {
    await this.mailerService
      .sendMail({
        to: user.이메일,
        from: 'teamnexters@gmail.com', // Senders email address
        subject: '[NEXTERS] 19기 면접 일정에 대해 알려드립니다.',
        template: `./${template}`, // The `.pug` or `.hbs` extension is appended automatically.
        context: {
          username: user.이름,
          date: user.날짜,
          time: user.시간,
          role: user.직무,
        },
      })
      // .then(() => console.log('success'))
      .catch(err => {
        console.log(
          `${user.이름},${user.이메일},${user['핸드폰 번호']},${user.날짜},${user.시간},${user.직무}`,
        );
      });
  }

  async sendMailToApplicants(template: string): Promise<void> {
    const entities: ParsedData<RealCsvEntity> = await this.csvService.parse(
      this.csvStream,
      RealCsvEntity,
      null,
      null,
      {
        separator: ',',
      },
    );

    entities.list.forEach(async user => {
      await this.taskJob(user, template);
    });
  }
}

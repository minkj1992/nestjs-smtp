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

  async sendMailToSuccessfulApplicants(): Promise<void> {
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
      console.log(user);
      await this.mailerService
        .sendMail({
          to: user.이메일,
          from: 'minkj1992@gmail.com', // Senders email address
          subject: '[NEXTERS] 19기 서류 전형 결과 발표 안내',
          template: './index', // The `.pug` or `.hbs` extension is appended automatically.
          context: {
            username: user.이름,
            meetDate:
              '6월 5일 일요일 13:00 - 13:25 / 30분간 그룹 인터뷰로 진행',
            meetPlace:
              'Open up 저스트코 타워 13층 ( 선릉역 10번 출구 도보 5분 )',
          },
        })
        .then(success => {
          console.log(success);
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  async sendMailToUnsuccessfulApplicants(): Promise<void> {}
}

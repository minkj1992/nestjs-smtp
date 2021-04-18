import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AppService {
  constructor(private readonly mailerService: MailerService) {}

  getHello(): string {
    return 'Hello World!';
  }

  public example(): void {
    this.mailerService
      .sendMail({
        to: 'minkj1992@gmail.com', // List of receivers email address
        from: 'minkj1992@gmail.com', // Senders email address
        subject: '메일 테스트 ✔', // Subject line
        text: 'welcome 민욱', // plaintext body
        html: '<b>welcome 민욱</b>', // HTML body content
      })
      .then(success => {
        console.log(success);
      })
      .catch(err => {
        console.log(err);
      });
  }

  public documentPassNotification(): void {
    this.mailerService
      .sendMail({
        to: 'minkj1992@gmail.com', // List of receivers email address
        from: 'minkj1992@gmail.com', // Senders email address
        subject: '[NEXTERS] 19기 서류 전형 결과 발표 안내',
        template: 'index', // The `.pug` or `.hbs` extension is appended automatically.
        context: {
          meetDate: '6월 5일 일요일 13:00 - 13:25 / 30분간 그룹 인터뷰로 진행',
          meetPlace: 'Open up 저스트코 타워 13층 ( 선릉역 10번 출구 도보 5분 )',
          username: '제민욱',
        },
      })
      .then(success => {
        console.log(success);
      })
      .catch(err => {
        console.log(err);
      });
  }
}

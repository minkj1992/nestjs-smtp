import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('template')
  sendTemplate(flag = true) {
    return flag
      ? this.appService.sendMailToApplicants('meet_notification')
      : this.appService.sendMailToApplicants('index_fail');
  }
}

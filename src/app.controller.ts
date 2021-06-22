import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('template')
  sendTemplate(flag = false) {
    return flag
      ? this.appService.sendMailToApplicants('final_success')
      : this.appService.sendMailToApplicants('final_fail');
  }
}

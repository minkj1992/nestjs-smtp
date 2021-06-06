import { Controller, Get } from '@nestjs/common';
import { CsvService } from './csv.service';

@Controller('csv')
export class CsvController {
  constructor(private readonly csvService: CsvService) {}

  @Get('csv')
  sendTemplate(): any {
    return this.csvService.readCsv('test.csv');
  }
}

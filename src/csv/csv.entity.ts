export class CsvEntity {
  foo: string;

  bar: string;

  constructor(partial: Partial<CsvEntity>) {
    Object.assign(this, partial);
  }
}

export class RealCsvEntity {
  '이름': string;
  '이메일': string;
  '핸드폰 번호': string;
  '날짜': string;
  '시간': string;
  '직무': string;
  constructor(partial: Partial<RealCsvEntity>) {
    Object.assign(this, partial);
  }
}

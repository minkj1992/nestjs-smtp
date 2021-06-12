export class CsvEntity {
  foo: string;

  bar: string;

  constructor(partial: Partial<CsvEntity>) {
    Object.assign(this, partial);
  }
}

export class RealCsvEntity {
  '타임스탬프': string;
  '이름': string;
  '현재 직업': string;
  '이메일': string;
  '핸드폰 번호': string;

  constructor(partial: Partial<RealCsvEntity>) {
    Object.assign(this, partial);
  }
}

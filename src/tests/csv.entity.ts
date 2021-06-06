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
  '1. 가장 자신있는 분야를 선택해주세요. (중복가능)': string;
  '2. 넥스터즈에서 해보고 싶은 분야를 선택해주세요. (중복가능)': string;
  '3. NEXTERS에 지원하게 된 계기와 이유는 무엇인가요? (500자 제한)': string;
  '4.자신의 강점은 무엇인가요? 자신을 강점과 함께 자유롭게 표현해 주세요. (300자 제한)': string;
  '5.지금까지의 협업 활동 중 문제 혹은 갈등에 부딪혔던 경험과 이를 어떻게 해결했었는지 과정을 서술해 주세요. (500자 제한)': string;
  '6. 위의 예시와 같이 자신이 주도적으로 참여한 프로젝트를 작성해주세요. ': string;
  '7. 위에 작성해준 프로젝트 중 대표 프로젝트에 대해서 자세히 소개 해 주세요. (500자 제한)': string;
  '8. 위 프로젝트를 진행하며 가장 기억에 남았던 기술적 이슈와 이를 어떻게 해결했는지 설명해주세요.( 500자 제한)': string;
  '9. 19기에 활동에서, 꼭 경험 해보고 싶으신 것이 있다면 자유롭게 설명해주세요.': string;
  '1. Github 주소를 적어주세요': string;
  '2. 포트폴리오 사이트 주소가 있다면 적어주세요. (선택사항 / 최대 3개)': string;
  '3. 개인 포트폴리오를 첨부해주세요. (프로젝트 3개 / 20장 이내 / 최대 10MB제한 / PDF로 제출)': string;

  constructor(partial: Partial<RealCsvEntity>) {
    Object.assign(this, partial);
  }
}

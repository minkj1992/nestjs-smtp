<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" />
  </a>
</p>

<p align="center">
  Demo implementation on the mailer modules for Nest framework (node.js) using <a href="https://nodemailer.com/">Nodemailer</a> library
</p>

## Goal
> Simple SMTP server

- feat
  - 유저 정보가 들어있는 csv read with altair-graphql
  - 해당 유저들에게 template에 맞게 mail 전송

## setup
- 사용할 어드민 gmail 계정은 `Less secure app access`가 `on` 되어있어야 한다.
- gmail의 `smtp`는 요청 건수가 약 100건이 넘어가면 서버 에러를 띄운다.
- gmail의 경우 1초당 특정 갯수 이상의 메일을 보내게 될 경우 temporary error를 띄운다.
// ========== Respoinse Example Schemas
// import all modules
import { ApiProperty } from '@nestjs/swagger';

export class LoginSuccessExample {
  @ApiProperty({
    title: 'Http Status Code',
    default: 200,
    type: Number,
  })
  statusCode: number;

  @ApiProperty({
    title: 'Response Data',
    type: Object,
    default: {
      username: 'jhondoe',
      passwors: 'Jh7ond0e123$',
    },
  })
  data: Object;
}

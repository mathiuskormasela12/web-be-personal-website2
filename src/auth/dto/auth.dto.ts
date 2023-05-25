// ========== Auth Dto
// import all modules
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    title: 'Username',
    type: String,
    default: 'jhondoe123',
    required: true,
  })
  @IsString({ message: 'The username should be a string' })
  @IsNotEmpty({ message: 'The username is required' })
  username: string;

  @ApiProperty({
    title: 'Password',
    type: String,
    default: 'Jh7ond0e123$',
    required: true,
  })
  @IsStrongPassword({}, { message: 'The password is too weak' })
  @IsNotEmpty({ message: 'The password is required' })
  password: string;
}

// ========== Auth Controller
// import all modules
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import { LoginSuccessExample } from './response-example-schemas/response.example.schemas';

@ApiTags('Auth')
@Controller('/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiResponse({ status: HttpStatus.OK, type: LoginSuccessExample })
  public login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}

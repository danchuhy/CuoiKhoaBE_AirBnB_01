import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';

import signUpDTO from './dto/signup.dto';
import signInDTO from './dto/signin.dto';


@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ApiBody({ type: signUpDTO, required: true })
  async signUp(@Body() body: signUpDTO, @Res() response): Promise<any> {
    const data = await this.authService.signUp(body);
    response.status(data.status).json(data);
  }

  @Post('/signin')
  @ApiBody({ type: signInDTO, required: true })
  async signIn(@Body() body: signInDTO, @Res() response): Promise<any> {
    const data = await this.authService.signIn(body);
    response.status(data.status).json(data);
  }
}

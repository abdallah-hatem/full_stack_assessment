import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ResponseUtil } from 'src/common/utils/response.util';
import { Request } from 'express';
import { Auth } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto, @Req() req: Request) {
    const result = await this.authService.register(registerDto);
    return ResponseUtil.created(
      result,
      `Your account has been created successfully`,
      req.url,
    );
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Req() req: Request) {
    const result = await this.authService.login(loginDto);

    return ResponseUtil.success(
      result,
      `Welcome back! Login successful`,
      200,
      req.url,
    );
  }

  @Auth()
  @Get('me')
  async me(@Req() req: Request) {
    return ResponseUtil.success(
      [],
      `If you see this, you are authenticated`,
      200,
      req.url,
    );
  }
}

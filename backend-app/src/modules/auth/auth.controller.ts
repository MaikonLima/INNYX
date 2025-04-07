import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Request } from 'express';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() loginDto: AuthDto) {
    return this.authService.validateUser(loginDto.email, loginDto.password);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refresh(@Req() req: Request) {
    const user = req.user as any;
    const refreshToken = req.headers['authorization']?.replace('Bearer ', '');
    return this.authService.refreshTokens(user.sub, refreshToken);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('logout')
  async logout(@Req() req: Request) {
    const user = req.user as any;
    await this.authService.logout(user.sub);
    return { message: 'Logout realizado com sucesso' };
  }
}

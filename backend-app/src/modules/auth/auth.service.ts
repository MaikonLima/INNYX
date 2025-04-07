import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) throw new UnauthorizedException('Usuário não encontrado');

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) throw new UnauthorizedException('Senha inválida');

    const tokens = await this.generateTokens(
      user.id,
      user.email,
      user.roles.map((r) => r.role.name),
    );
    await this.usersService.updateRefreshToken(user.id, tokens.refresh_token);

    return {
      ...tokens,
      name: user.name,
    };
  }

  async generateTokens(userId: number, email: string, roles: any) {
    const payload = { sub: userId, email, roles };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: 'jwt_secret_key',
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: 'jwt_refresh_secret',
        expiresIn: '7d',
      }),
    ]);

    return { access_token, refresh_token };
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.usersService.findById(userId);

    if (!user || !user.refreshToken) throw new UnauthorizedException();

    const tokenMatches = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!tokenMatches)
      throw new UnauthorizedException('Refresh token inválido');

    const tokens = await this.generateTokens(
      user.id,
      user.email,
      user.roles.map((r) => r.role.name),
    );
    await this.usersService.updateRefreshToken(user.id, tokens.refresh_token);

    return tokens;
  }

  async logout(userId: number) {
    await this.usersService.updateRefreshToken(userId, null);
    return { message: 'Logout realizado com sucesso' };
  }
}

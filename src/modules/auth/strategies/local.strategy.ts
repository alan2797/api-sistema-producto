import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'user' });
  }

  async validate(user: string, password: string): Promise<any> {
    const userData = await this.authService.validateUsuario(user, password);
    if (!userData) {
      throw new UnauthorizedException('Credenciales Incorrectas');
    }
    return userData;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { PayloadDto } from './dto/payload.dto';
import { UsuarioTokenDto } from './dto/usuario-token.dto';
import { BasicMapper } from 'src/shared/utils/basic-mapper';
import { LoginDto } from './dto/login.dto';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthService {
  private googleClient: OAuth2Client;
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {
    this.googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByUser(loginDto.user);
    console.log(user);
    if (!user) {
      throw new NotFoundException(`User with email ${loginDto.user} not found`);
    }
    return this.getUsuarioToken(user);
  }

  generateToken(user: User) {
    const payload: PayloadDto = { user: user.user, id: user.id, rol: user.rol };
    const accessToken = this.jwtService.sign(payload);
    return accessToken;
  }

  getUsuarioToken(user: User) {
    const dto = new UsuarioTokenDto();
    BasicMapper.map(user, dto);
    dto.accessToken = this.generateToken(user);
    dto.status = user.status;
    dto.rol = user.rol;
    console.log(dto);
    return dto;
  }

  async validateUsuario(userData: string, password: string) {
    const user = await this.userService.findByUser(userData);
    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }

  async register(body: CreateUserDto) {
    const user = await this.userService.create(body);
    return this.getUsuarioToken(user);
  }

  async getUser(user: User) {
    return await this.userService.findByUser(user.user);
  }
}

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/shared/decorators/public.decorator';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Users } from '../../shared/decorators/user.decorator';
import { SuccessMessage } from 'src/shared/decorators/success-message.decorator';
import { UsuarioTokenDto } from './dto/usuario-token.dto';
import { ApiObjResponse } from 'src/shared/decorators/api-obj-response';
import { User } from '../user/entities/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @SuccessMessage('Autenticación Exitoso')
  @ApiObjResponse(UsuarioTokenDto)
  login(@Body() loginDto: LoginDto) {
    const login = this.authService.login(loginDto);
    return login;
  }

  @Public()
  @Post('register')
  @SuccessMessage('registro Exitoso')
  @ApiObjResponse(UsuarioTokenDto)
  async register(@Body() body: CreateUserDto) {
    const data = await this.authService.register(body);
    return data;
  }

  @Get('profile')
  @ApiObjResponse(User)
  async profile(@Users() user: User) {
    return await this.authService.getUser(user);
  }
}

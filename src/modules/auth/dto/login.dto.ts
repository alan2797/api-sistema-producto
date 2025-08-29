import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ default: 'alan' })
  @IsNotEmpty({ message: "El campo 'usuario' es obligatorio" })
  @MinLength(3)
  user: string;

  @ApiProperty({ default: '123456' })
  @IsNotEmpty({ message: "El campo 'contraseña' es obligatorio" })
  @MinLength(6)
  password: string;
}

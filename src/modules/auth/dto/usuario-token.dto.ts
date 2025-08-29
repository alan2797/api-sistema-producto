import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UsuarioTokenDto {
  @IsNotEmpty()
  @ApiProperty({ type: 'number' })
  id = '';

  @IsNotEmpty()
  @ApiProperty({ type: 'string' })
  rol = '';

  @IsNotEmpty()
  @ApiProperty({ type: 'string' })
  status = '';

  @IsNotEmpty()
  @ApiProperty({ type: 'string' })
  createdAt = '';

  @IsNotEmpty()
  @ApiProperty({ type: 'string' })
  accessToken = '';
}

import { ApiProperty } from '@nestjs/swagger';

export class Response<T = any> {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  timestamp: string;

  @ApiProperty()
  path: string;

  @ApiProperty()
  data: T;

  constructor(data: T, message = 'Ok', status = 200) {
    this.statusCode = status;
    this.message = message;
    this.data = data;
  }

  static created<T>(data: T, message = 'Created') {
    return new Response(data, message, 201);
  }

  static ok<T>(data: T, message = 'Ok') {
    return new Response(data, message, 200);
  }

  static error<T>(data: T, message = 'Error', status = 500) {
    return new Response(data, message, status);
  }
}

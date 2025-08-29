import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
@Catch()
export class ErrorExceptionsFilter implements ExceptionFilter {
  constructor() {}
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const method = request.method;
    const url = request.url;

    const timestamp = new Date().toISOString();
    const path = request.url;

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = HttpStatus[status];
    let errors: any = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const responseBody = exception.getResponse();

      if (typeof responseBody === 'string') {
        message = responseBody;
      } else if (typeof responseBody === 'object') {
        const res = responseBody as any;
        message = res.message || exception.message;
        errors = res.errors ?? null;
      }
    }

    response.status(status).json({
      statusCode: status,
      message,
      errors, // ahora se incluye
      timestamp,
      path,
    });
  }
}

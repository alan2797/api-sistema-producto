import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { SUCCESS_MESSAGE_KEY } from 'src/shared/decorators/success-message.decorator';
import { MessageResponse } from 'src/constants/message-response';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();

    const customMessage =
      this.reflector.get<string>(SUCCESS_MESSAGE_KEY, context.getHandler()) ||
      MessageResponse.GENERAL;

    return next.handle().pipe(
      map((data) => ({
        statusCode: 200,
        message: customMessage,
        data,
        timestamp: new Date().toISOString(),
        path: request.url,
      })),
    );
  }
}

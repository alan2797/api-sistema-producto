import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export const validationPipe = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  exceptionFactory: (errors) => new ValidationException(errors),
});

class ValidationException extends HttpException {
  constructor(public errors: ValidationError[]) {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Campos inválidos',
        errors: ValidationException.flattenErrors(errors),
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  private static flattenErrors(
    errorsArray: ValidationError[],
    parentPath: string = '',
    result: Record<string, string[]> = {},
  ): Record<string, string[]> {
    for (const error of errorsArray) {
      const propertyPath = parentPath
        ? `${parentPath}.${error.property}`
        : error.property;

      if (error.constraints) {
        result[propertyPath] = Object.values(error.constraints);
      }

      if (Array.isArray(error.children) && error.children.length > 0) {
        this.flattenErrors(error.children, propertyPath, result);
      }
    }

    return result;
  }
}

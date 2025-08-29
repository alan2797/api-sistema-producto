import { SetMetadata } from '@nestjs/common';

export const SUCCESS_MESSAGE_KEY = 'Operación Exitosa';

export const SuccessMessage = (message: string) =>
  SetMetadata(SUCCESS_MESSAGE_KEY, message);

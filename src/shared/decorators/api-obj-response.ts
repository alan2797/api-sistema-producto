import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiObjResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiExtraModels(model),
    ApiOkResponse({
      schema: {
        allOf: [
          {
            type: 'object',
            properties: {
              statusCode: { type: 'number', example: 200 },
              message: { type: 'string', example: 'Operación exitosa' },
              timestamp: { type: 'string', format: 'date-time' },
              path: { type: 'string', example: '/api/ejemplo' },
              data: { $ref: getSchemaPath(model) },
            },
          },
        ],
      },
    }),
  );
};

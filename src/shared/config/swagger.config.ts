import { DocumentBuilder } from '@nestjs/swagger';

export const configSwagger = new DocumentBuilder()
  .setTitle('PRUEBA TECNICA API WORKMATE')
  .setDescription('Api con NestJS')
  .setVersion('1.0')
  .addSecurity('bearer', {
    type: 'http',
    scheme: 'Bearer',
    description: 'Por favor ingrese el Token',
  })
  .addSecurityRequirements('bearer')
  .build();

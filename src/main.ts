import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ResponseInterceptor } from './shared/interceptors/response-success.interceptor';
import { ErrorExceptionsFilter } from './shared/filters/error-exceptions.filter';
import { configSwagger } from './shared/config/swagger.config';
import { validationPipe } from './shared/config/validation-pipe.config';
import { LoggingInterceptor } from './shared/interceptors/logging.interceptor';
import { SerializationInterceptor } from './shared/interceptors/serialization.interceptor';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { JwtAuthGuard } from './modules/auth/guard/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //validaciones
  app.useGlobalPipes(validationPipe);

  // Aplicar el guard globalmente
  app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector))); // Esto podría causar problemas

  app.setGlobalPrefix('api');
  app.enableCors();
  const configService: ConfigService = app.get(ConfigService);

  //swagger configuraciones
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalInterceptors(new ResponseInterceptor(app.get(Reflector)));
  app.useGlobalInterceptors(new SerializationInterceptor());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(configService.get('PORT') || 3000);
}
/*setInterval(() => {
  const used = process.memoryUsage();
  console.log('📊 Memoria usada:');
  for (const key in used) {
    console.log(`  ${key}: ${(used[key] / 1024 / 1024).toFixed(2)} MB`);
  }
}, 10000);*/
bootstrap();

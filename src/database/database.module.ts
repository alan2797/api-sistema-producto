import { Module } from '@nestjs/common';
import { databaseProviders } from './database.provider';
import { ConfigModule } from '@nestjs/config';

const enviroments = {
  development: '.env.development',
  production: '.env.production',
};
const currentEnv = process.env.NODE_ENV as keyof typeof enviroments;
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[currentEnv] || '.env',
      isGlobal: true,
    }),
    ...databaseProviders,
  ],
  exports: [...databaseProviders],
})
export class DatabaseModule {}

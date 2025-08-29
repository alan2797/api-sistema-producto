// src/data-source.ts
import 'dotenv/config';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  //url: process.env.DATABASE_URL,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [`${__dirname}/../**/*.entity{.js,.ts}`],
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
  synchronize: false,
  ssl: {
    rejectUnauthorized: false, // ⚠️ para entornos de desarrollo
  },
  extra: {
    family: 4, // 👈 Forzar IPv4
  },
});

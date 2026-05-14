import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'your_database',
      entities: [path.join(__dirname, '..', '..', 'modules', '**', 'entities', '*.{js,ts}')],
      synchronize: true,
      logging: process.env.NODE_ENV === 'development',
    }),
  ],
})
export class DatabaseModule {}

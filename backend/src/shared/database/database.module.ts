import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      host: process.env.PGHOST || 'localhost',
      port: parseInt(process.env.PGPORT) || 5432,
      username: process.env.PGUSER || 'postgres',
      password: process.env.PGPASSWORD || 'postgres',
      database: process.env.PGDATABASE || 'postgres',
      entities: [path.join(__dirname, '..', '..', 'modules', '**', 'entities', '*.{js,ts}')],
      synchronize: true,
      logging: process.env.NODE_ENV === 'development',
      // ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
      ssl: false,
    }),
  ],
})
export class DatabaseModule {}

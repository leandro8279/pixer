import { RequestLoggerMiddleware } from '@/common/middlewares/RequestLogger.middleware';
import { AuthModule } from '@/modules/auth/auth.module';
import { SettingsModule } from '@/modules/settings/settings.module';
import { DatabaseModule } from '@/shared/database/database.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ShopsModule } from './modules/shops/shops.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // load: [appConfig, databaseConfig, jwtConfig, cacheConfig],
    }),
    DatabaseModule,
    AuthModule,
    SettingsModule,
    ShopsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}

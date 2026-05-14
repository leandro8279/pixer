import { RequestLoggerMiddleware } from '@/common/middlewares/RequestLogger.middleware';
import { AuthModule } from '@/modules/auth/auth.module';
import { DatabaseModule } from '@/shared/database/database.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // load: [appConfig, databaseConfig, jwtConfig, cacheConfig],
    }),
    DatabaseModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}

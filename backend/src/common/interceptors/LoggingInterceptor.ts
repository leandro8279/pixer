/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';

import { Observable, tap } from 'rxjs';

/**
 * Interceptor global de logging HTTP.
 * Loga METHOD, path, status code e latência de cada request.
 *
 * Saída no console:
 *   [HTTP] GET /api/products → 200 +47ms
 *   [HTTP] POST /api/orders  → 422 +12ms  ← errors também são logados
 *
 * Registrar globalmente em main.ts:
 *   app.useGlobalInterceptors(new LoggingInterceptor());
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest<any>();
    const { method, url } = req as { method: string; url: string };
    const startedAt = Date.now();

    return next.handle().pipe(
      tap({
        next: () => {
          const res = context.switchToHttp().getResponse();
          const statusCode = res.statusCode as number;
          const ms = Date.now() - startedAt;
          this.logger.log(`${method} ${url} → ${statusCode} +${ms}ms`);
        },
        error: (err: unknown) => {
          const ms = Date.now() - startedAt;
          const status = (err as any)?.status ?? 500;
          this.logger.warn(`${method} ${url} → ${status} +${ms}ms`);
        },
      }),
    );
  }
}

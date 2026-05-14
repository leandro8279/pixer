import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';

import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

/**
 * Interceptor de timeout de requisição.
 * Aborta requests que demorem mais que `timeoutMs` milissegundos
 * e retorna 408 Request Timeout.
 *
 * Padrão: 30 segundos. Ajuste por rota passando um valor diferente no construtor.
 *
 * Registrar globalmente em main.ts:
 *   app.useGlobalInterceptors(new TimeoutInterceptor());
 *
 * @example
 * // Timeout customizado por rota:
 * @UseInterceptors(new TimeoutInterceptor(5_000))
 * @Post('heavy-operation')
 * heavyOperation() { ... }
 */
@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  constructor(private readonly timeoutMs: number = 30_000) {}

  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    return next.handle().pipe(
      timeout(this.timeoutMs),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          return throwError(
            () =>
              new RequestTimeoutException(
                `A requisição excedeu o timeout de ${this.timeoutMs}ms`,
              ),
          );
        }
        return throwError(() => err);
      }),
    );
  }
}

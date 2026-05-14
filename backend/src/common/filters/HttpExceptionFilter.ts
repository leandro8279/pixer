/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

interface ErrorBody {
  statusCode: number;
  message: string | string[];
  error?: string;
  code?: string;
  timestamp: string;
  path: string;
}

/**
 * Filtro global de exceções HTTP.
 * Captura qualquer exceção lançada (HttpException ou erro genérico) e formata
 * a resposta JSON de forma consistente:
 *
 *   {
 *     "statusCode": 404,
 *     "message":    "Produto não encontrado",
 *     "code":       "NOT_FOUND",          // presente nas AppException
 *     "error":      "Not Found",          // presente nas HttpException nativas do NestJS
 *     "timestamp":  "2026-05-12T23:00:00.000Z",
 *     "path":       "/api/products/999"
 *   }
 *
 * Registrar globalmente em main.ts:
 *   app.useGlobalFilters(new HttpExceptionFilter());
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<any>();
    const request = ctx.getRequest();

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message: string | string[] = 'Erro interno do servidor';
    let error: string | undefined;
    let code: string | undefined;

    if (exception instanceof HttpException) {
      const res = exception.getResponse();
      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object' && res !== null) {
        const obj = res as Record<string, unknown>;
        message = (obj['message'] as string | string[]) ?? message;
        error = obj['error'] as string | undefined;
        code = obj['code'] as string | undefined;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    if (statusCode >= 500) {
      const stack =
        exception instanceof Error ? exception.stack : String(exception);
      this.logger.error(
        `${String(message)} [${statusCode}] ${request.url as string}`,
        stack,
      );
    }

    const body: ErrorBody = {
      statusCode,
      message,
      ...(error && { error }),
      ...(code && { code }),
      timestamp: new Date().toISOString(),
      path: request.url as string,
    };

    response.status(statusCode).json(body);
  }
}

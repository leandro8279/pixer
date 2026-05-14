import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

/**
 * Middleware de logging de requisições HTTP.
 * Loga METHOD, URL, status code e latência quando a resposta termina.
 *
 * Diferença do LoggingInterceptor:
 *   - Este middleware roda antes do roteamento do NestJS e captura
 *     requisições que nem chegam a entrar no pipeline de um controller
 *     (ex: rotas 404 resolvidas pelo Express).
 *   - O LoggingInterceptor cobre apenas requests que chegam a um controller.
 *   - Use ambos para cobertura completa.
 *
 * Nível de log automático:
 *   5xx → logger.error
 *   4xx → logger.warn
 *   2xx/3xx → logger.log
 *
 * Registrar em AppModule.configure():
 *   consumer.apply(RequestLoggerMiddleware).forRoutes('*');
 */
@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('Request');

  use(req: any, res: any, next: () => void): void {
    const { method, originalUrl } = req as {
      method: string;
      originalUrl: string;
    };
    const startedAt = Date.now();

    res.on('finish', () => {
      const ms = Date.now() - startedAt;
      const statusCode = res.statusCode as number;

      const msg = `${method} ${originalUrl} ${statusCode} +${ms}ms`;

      if (statusCode >= 500) this.logger.error(msg);
      else if (statusCode >= 400) this.logger.warn(msg);
      else this.logger.log(msg);
    });

    next();
  }
}

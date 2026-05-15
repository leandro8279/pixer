import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Marvel API')
    .setDescription(
      'Documentação completa da API Marvel — plataforma de e-commerce multi-vendor.\n\n' +
      '**Autenticação:** endpoints protegidos exigem token Bearer JWT.\n' +
      'Faça login em `POST /api/auth/token` e clique em **Authorize** para inserir o token.',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Token JWT obtido em POST /api/auth/token',
      },
      'JWT',
    )
    .addTag('Autenticação',  'Registro, login, recuperação de senha e OTP')
    .addTag('Perfil',        'Dados do usuário autenticado')
    .addTag('Produtos',      'Catálogo: listagem, busca, criação, edição e exclusão de produtos')
    .addTag('Aluguel',       'Disponibilidade e cálculo de preço para produtos de locação')
    .addTag('Wishlists',     'Lista de desejos do cliente autenticado')
    .addTag('Catálogo CSV',  'Importação e exportação de produtos e variações via CSV')
    .addTag('IA',            'Geração de descrições de produtos com inteligência artificial')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs/swagger', app, document);

  app.use(
    '/api/docs',
    apiReference({
      content: document,
      theme: 'default',
    }),
  );
}
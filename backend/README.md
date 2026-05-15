# Pixer API — Backend

API REST do marketplace multi-vendor **Pixer**, construída com **NestJS** e **TypeORM**.

---

## Sumário

- [Visão Geral](#visão-geral)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Executando o Projeto](#executando-o-projeto)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Endpoints da API](#endpoints-da-api)
- [Autenticação](#autenticação)
- [Banco de Dados](#banco-de-dados)
- [Documentação Swagger](#documentação-swagger)

---

## Visão Geral

O backend do Pixer fornece toda a lógica de negócio para um marketplace multi-vendor, incluindo:

- Autenticação e autorização com JWT
- Gerenciamento de lojas e vendedores
- Controle de produtos, pedidos e estoque
- Sistema de revogação de tokens
- Configurações globais da plataforma

---

## Tecnologias

| Tecnologia | Versão | Função |
|---|---|---|
| Node.js | 24+ | Runtime |
| NestJS | 11 | Framework principal |
| TypeORM | 0.3 | ORM |
| PostgreSQL | — | Banco de dados |
| Passport.js + JWT | — | Autenticação |
| Swagger / Scalar | — | Documentação da API |
| class-validator | — | Validação de DTOs |
| bcryptjs | — | Hash de senhas |

---

## Pré-requisitos

- Node.js 20+
- pnpm 10+
- PostgreSQL 14+

---

## Instalação

Na raiz do monorepo:

```bash
pnpm install
```

---

## Variáveis de Ambiente

Crie um arquivo `.env` dentro da pasta `backend/` com as seguintes variáveis:

```env
# Servidor
BACKEND_PORT=3001
NODE_ENV=development

# JWT
JWT_SECRET=sua_chave_secreta_aqui

# Banco de Dados
DATABASE_URL=postgresql://usuario:senha@localhost:5432/pixer
PGHOST=localhost
PGPORT=5432
PGUSER=postgres
PGPASSWORD=postgres
PGDATABASE=pixer
```

> **Atenção:** nunca use o valor padrão `changeme` para `JWT_SECRET` em produção.

---

## Executando o Projeto

```bash
# Modo de desenvolvimento (com watch)
pnpm --filter @workspace/backend run dev

# Build de produção
pnpm --filter @workspace/backend run build

# Executar build de produção
pnpm --filter @workspace/backend run start:prod

# Popular banco com dados iniciais
pnpm --filter @workspace/backend run seed
```

O servidor inicia em `http://localhost:3001` por padrão.

---

## Estrutura de Pastas

```
backend/src/
├── app.module.ts                    # Módulo raiz
├── main.ts                          # Ponto de entrada
│
├── common/
│   ├── decorators/
│   │   └── CurrentUser.ts           # Decorator @CurrentUser() e tipo AuthenticatedUser
│   ├── filters/
│   │   └── HttpExceptionFilter.ts   # Formatação padronizada de erros HTTP
│   ├── interceptors/
│   │   ├── LoggingInterceptor.ts    # Log de todas as requisições
│   │   └── TimeoutInterceptor.ts    # Timeout global de 30s
│   └── middlewares/
│       └── RequestLogger.middleware.ts
│
├── config/
│   └── SwaggerConfig.ts             # Configuração do Swagger/Scalar
│
├── modules/
│   ├── auth/                        # Módulo de autenticação
│   │   ├── controllers/
│   │   │   └── Auth.controller.ts   # POST /auth/register, POST /auth/token
│   │   ├── dto/                     # LoginRequest/Response, RegisterRequest/Response
│   │   ├── entities/                # User, Role, Permission, RevokedToken, Wallet...
│   │   ├── guards/
│   │   │   └── JwtAuth.guard.ts     # Guarda JWT com verificação de revogação
│   │   ├── repositories/
│   │   │   └── AuthRepository/      # IAuthRepository + implementação TypeORM
│   │   ├── services/
│   │   │   ├── LoginService/
│   │   │   └── RegisterService/
│   │   └── strategies/
│   │       └── Jwt.strategy.ts      # Estratégia Passport JWT
│   │
│   ├── settings/                    # Configurações globais — GET /settings
│   └── shops/                       # Lojas — GET /shops/:id
│
└── shared/
    └── database/                    # DatabaseModule (TypeORM) e seeds
```

---

## Endpoints da API

### Autenticação — `/auth`

#### `POST /auth/register`
Registra um novo usuário na plataforma.

**Body:**
```json
{
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "password": "senha123",
  "permission": "store_owner"
}
```

**Resposta `201`:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "permissions": ["manage_shop"],
  "role": "store_owner"
}
```

---

#### `POST /auth/token`
Realiza login e retorna um token JWT.

**Body:**
```json
{
  "email": "joao@exemplo.com",
  "password": "senha123"
}
```

**Resposta `200`:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "permissions": ["manage_shop"],
  "email_verified": true,
  "role": "store_owner"
}
```

---

### Configurações — `/settings`

#### `GET /settings`
Retorna as configurações globais da plataforma.

**Query params:**

| Parâmetro | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `language` | `string` | Não | Idioma das configurações (ex: `pt`, `en`) |

---

### Lojas — `/shops`

#### `GET /shops/:id`
Retorna os dados de uma loja pelo ID ou slug.

**Path params:**

| Parâmetro | Tipo | Descrição |
|---|---|---|
| `id` | `string` | ID ou slug da loja |

**Query params:**

| Parâmetro | Tipo | Descrição |
|---|---|---|
| `language` | `string` | Idioma dos dados retornados |

> Se o solicitante for o proprietário da loja ou um administrador, a resposta inclui o campo `balance`.

---

## Autenticação

O sistema utiliza **JWT (JSON Web Token)** com suporte a **revogação de tokens**.

### Fluxo completo

```
1. POST /auth/token com email e senha
           ↓
2. Servidor valida credenciais → retorna JWT
           ↓
3. Cliente envia: Authorization: Bearer <token>
           ↓
4. JwtStrategy valida assinatura com JWT_SECRET e decodifica o payload
           ↓
5. JwtAuthGuard verifica se o token está na tabela revoked_tokens
           ↓
6. req.user populado com { id, email } → controller recebe a requisição
```

### Protegendo uma rota

```typescript
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/modules/auth/guards/JwtAuth.guard';
import { CurrentUser, AuthenticatedUser } from '@/common/decorators/CurrentUser';

@Get('perfil')
@UseGuards(JwtAuthGuard)
getPerfil(@CurrentUser() user: AuthenticatedUser) {
  return user; // { id: string, email: string }
}
```

### Revogação de tokens

Tokens revogados ficam armazenados na tabela `revoked_tokens` com um hash SHA-256. A cada requisição autenticada, o guard:

1. Calcula o hash do token recebido
2. Busca o hash na tabela
3. Se encontrado e ainda dentro da validade → rejeita com `401 Unauthorized`
4. Se encontrado mas expirado → remove o registro e permite a requisição

---

## Banco de Dados

O projeto usa **TypeORM** com `synchronize: true` em desenvolvimento (o schema é criado/atualizado automaticamente).

### Entidades principais

| Entidade | Tabela | Descrição |
|---|---|---|
| `User` | `users` | Usuários da plataforma |
| `Role` | `roles` | Papéis (ex: admin, store_owner, customer) |
| `Permission` | `permissions` | Permissões granulares |
| `ModelHasRole` | `model_has_roles` | Vínculo usuário ↔ papel |
| `ModelHasPermission` | `model_has_permissions` | Vínculo usuário ↔ permissão |
| `RevokedToken` | `revoked_tokens` | Tokens JWT revogados |
| `Wallet` | `wallets` | Carteira de pontos do usuário |
| `PasswordReset` | `password_resets` | Solicitações de redefinição de senha |

---

## Documentação Swagger

Com o servidor rodando, acesse a documentação interativa em:

```
http://localhost:3001/api
```

A documentação é gerada automaticamente via `@nestjs/swagger` e exibida com o **Scalar API Reference**.

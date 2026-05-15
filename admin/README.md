# Pixer Admin — Frontend

Painel administrativo do marketplace multi-vendor **Pixer**, construído com **React 19** e **Vite**.

---

## Sumário

- [Visão Geral](#visão-geral)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Executando o Projeto](#executando-o-projeto)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Páginas e Rotas](#páginas-e-rotas)
- [Funcionalidades](#funcionalidades)
- [Internacionalização](#internacionalização)
- [Comunicação com a API](#comunicação-com-a-api)

---

## Visão Geral

O painel Pixer Admin permite que administradores e proprietários de lojas gerenciem todos os aspectos do marketplace:

- Cadastro e gestão de produtos, categorias e atributos
- Acompanhamento de pedidos e transações
- Gerenciamento de usuários, vendedores e equipe
- Configurações globais da plataforma
- Relatórios e análises via dashboard

---

## Tecnologias

| Tecnologia | Versão | Função |
|---|---|---|
| React | 19 | Framework de UI |
| Vite | 8 | Build e servidor de desenvolvimento |
| TypeScript | 6 | Tipagem estática |
| Tailwind CSS | 4 | Estilização |
| MobX | 6 | Gerenciamento de estado global |
| TanStack Query | 5 | Gerenciamento de estado do servidor |
| wouter | 3 | Roteamento |
| Axios | 1 | Cliente HTTP |
| React Hook Form + Yup | — | Formulários e validação |
| i18next | 26 | Internacionalização |
| ApexCharts | — | Gráficos e dashboards |
| Framer Motion | 12 | Animações |
| Headless UI | 2 | Componentes acessíveis |

---

## Pré-requisitos

- Node.js 20+
- pnpm 10+
- Backend rodando em `http://localhost:3001`

---

## Instalação

Na raiz do monorepo:

```bash
pnpm install
```

---

## Variáveis de Ambiente

Crie um arquivo `.env` dentro da pasta `admin/` se precisar sobrescrever o endereço da API:

```env
VITE_API_BASE_URL=http://localhost:3001
```

> Por padrão, o Vite já faz proxy de `/api` para `http://localhost:3001` via `vite.config.ts`, então essa variável só é necessária em ambientes com configuração diferente.

---

## Executando o Projeto

```bash
# Modo de desenvolvimento
pnpm --filter @workspace/admin run dev

# Build de produção
pnpm --filter @workspace/admin run build

# Preview do build de produção
pnpm --filter @workspace/admin run preview

# Verificação de tipos
pnpm --filter @workspace/admin run build  # inclui tsc -b
```

O painel estará disponível em `http://localhost:5000`.

---

## Estrutura de Pastas

```
admin/src/
├── assets/                     # Imagens e ícones SVG
│
├── components/
│   ├── auth/                   # Formulários de login e registro
│   ├── layouts/                # Wrappers de layout (AuthLayout)
│   └── ui/                     # Componentes atômicos (Button, Input, Table...)
│
├── config/
│   ├── routes.ts               # Definição centralizada de todas as rotas
│   └── query-client.ts         # Configuração do TanStack Query
│
├── contexts/
│   └── root-context.tsx        # RootProvider e hook useRootStore
│
├── pages/
│   ├── login/                  # Página de login
│   └── register/               # Página de registro
│
├── services/
│   ├── root.service.ts         # Instância central dos serviços
│   └── auth.service.ts         # Chamadas de autenticação à API
│
├── stores/
│   ├── RootStore.ts            # Store raiz (agrega todos os stores)
│   ├── AuthStore.ts            # Estado de autenticação (token, usuário)
│   ├── AppStore.ts             # Estado global da aplicação
│   └── SettingStore.ts         # Configurações da plataforma
│
├── types/                      # Definições TypeScript globais
├── utils/                      # Funções auxiliares e constantes
│
├── App.tsx                     # Componente raiz com roteamento
├── main.tsx                    # Ponto de entrada
└── i18n.ts                     # Configuração do i18next
```

---

## Páginas e Rotas

As rotas são definidas centralmente em `src/config/routes.ts`.

### Rotas públicas

| Rota | Página | Descrição |
|---|---|---|
| `/login` | `LoginPage` | Acesso ao painel |
| `/register` | `RegisterPage` | Cadastro de proprietário de loja |
| `/forgot-password` | — | Recuperação de senha |
| `/reset-password` | — | Redefinição de senha |

### Rotas do painel

| Rota | Descrição |
|---|---|
| `/` | Dashboard principal |
| `/profile` | Perfil do usuário |
| `/my-shops` | Minhas lojas |
| `/settings` | Configurações gerais |
| `/settings/payment` | Gateways de pagamento |
| `/settings/seo` | Configurações de SEO |
| `/settings/maintenance` | Modo de manutenção |
| `/settings/company-information` | Dados da empresa |

### Rotas de gerenciamento (CRUD)

Cada módulo abaixo segue o padrão `/recurso`, `/recurso/create` e `/recurso/:slug/edit`:

| Módulo | Rota base |
|---|---|
| Usuários | `/users` |
| Admins | `/users/admins` |
| Vendedores | `/users/vendors` |
| Clientes | `/users/customer` |
| Lojas | `/shops` |
| Produtos | `/products` |
| Categorias | `/categories` |
| Atributos | `/attributes` |
| Tags | `/tags` |
| Grupos / Types | `/groups` |
| Autores | `/authors` |
| Fabricantes | `/manufacturers` |
| Pedidos | `/orders` |
| Status de pedidos | `/order-status` |
| Cupons | `/coupons` |
| Impostos | `/taxes` |
| Fretes | `/shippings` |
| Saques | `/withdraws` |
| Reembolsos | `/refunds` |
| Avaliações | `/reviews` |
| Denúncias | `/abusive_reports` |
| Perguntas | `/questions` |
| Mensagens | `/message` |
| Avisos de loja | `/store-notices` |
| FAQs | `/faqs` |
| Políticas de reembolso | `/refund-policies` |
| Flash Sales | `/flash-sale` |
| Transferência de loja | `/shop-transfer` |

---

## Funcionalidades

### Autenticação
- Login com email e senha via JWT
- Registro de proprietário de loja
- Redirecionamento automático após login
- Persistência de sessão via store MobX

### Gestão de Produtos
- Cadastro de produtos físicos, digitais e de aluguel
- Suporte a variações e atributos
- Controle de estoque e inventário
- Importação via CSV
- Suporte a múltiplos idiomas por produto

### Gestão de Pedidos
- Listagem e acompanhamento de pedidos
- Gerenciamento de status de pedido
- Histórico de transações
- Verificação de checkout

### Gestão de Usuários
- Painel separado por tipo: admins, vendedores, clientes
- Gerenciamento de equipe e funcionários

### Marketing
- Cupons de desconto (criação e verificação)
- Flash Sales com produtos específicos
- Pop-ups de promoção
- Avisos de loja

### Configurações
- Configurações globais da plataforma
- Gateways de pagamento
- SEO
- Modo de manutenção
- Informações da empresa

### Comunicação
- Sistema de mensagens entre usuários e lojas
- Histórico de conversas

---

## Internacionalização

O painel suporta os seguintes idiomas, configuráveis via `i18next`:

| Código | Idioma |
|---|---|
| `pt-BR` | Português (Brasil) |
| `en` | Inglês |
| `es` | Espanhol |
| `de` | Alemão |
| `ar` | Árabe |
| `he` | Hebraico |
| `zh` | Chinês |

Os arquivos de tradução ficam em `admin/public/locales/<codigo>/`.

---

## Comunicação com a API

Toda comunicação com o backend passa pelo `BaseService`, que configura:

- **URL base:** `VITE_API_BASE_URL` ou proxy `/api` → `http://localhost:3001`
- **Interceptor de requisição:** injeta o token JWT no header `Authorization: Bearer <token>` automaticamente
- **Interceptor de resposta:** trata erros globais (401 → logout, etc.)

### Exemplo de uso nos stores

```typescript
// O token é gerenciado automaticamente pelo AuthStore
// Basta usar os serviços normalmente:
const response = await authService.login({ email, password });
// → POST /auth/token
```

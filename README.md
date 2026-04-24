# Encurtador de URL — Frontend

Interface web para encurtar URLs, construída com Next.js e Tailwind CSS.

## Tecnologias

- [Next.js 15](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)

## Pré-requisitos

- Node.js 18+
- Backend da aplicação rodando (veja a variável de ambiente abaixo)

## Instalação

```bash
npm install
```

## Configuração

Copie o arquivo de exemplo e ajuste a URL do backend:

```bash
cp .env.example .env.local
```

| Variável              | Descrição                  | Exemplo                 |
| --------------------- | -------------------------- | ----------------------- |
| `NEXT_PUBLIC_API_URL` | URL base da API do backend | `http://localhost:3333` |

## Rodando localmente

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Build para produção

```bash
npm run build
npm start
```

## Contrato da API

A aplicação consome um único endpoint:

**`POST /shortcuts`**

Request:
```json
{ "baseUrl": "https://exemplo.com/url-longa" }
```

Response:
```json
{ "shortCut": "https://seu-dominio.com/abc123" }
```

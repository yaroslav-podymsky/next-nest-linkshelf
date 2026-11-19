# LinkShelf

Учебный fullstack-проект: личная полка ссылок для обучения.

Стек: **Next.js** (App Router, FSD) + **Nest.js** (REST) + **PostgreSQL**.

Верстка простая — цель не UI, а связка фронт ↔ бэк ↔ БД, JWT и практики Next/Nest.

## Что умеет

После регистрации и входа пользователь:

- создаёт **коллекции**;
- добавляет в них **ссылки** (url, title, статус `todo` | `reading` | `done`);
- вешает **теги** и фильтрует список по статусу и тегу.

## Структура

```
full_stack/
  docker-compose.yml   # PostgreSQL
  nest/                # API (порт 3004)
  next/                # UI  (порт 3000)
```

Два приложения, у каждого свой `package.json`.

## Порты

| Сервис | URL | Зачем |
|---|---|---|
| Next | http://localhost:3000 | страницы в браузере |
| Nest | http://localhost:3004 | REST API |
| Postgres | localhost:5432 | БД |

CORS на Nest должен разрешать **origin фронта**: `http://localhost:3000` (`CORS_ORIGIN` в `nest/.env`).  
`NEXT_PUBLIC_API_URL` — адрес **API** (`http://localhost:3004`), не порт Next.

## Как поднять

Порядок: база → Nest → Next.

### 1. PostgreSQL

Из корня репозитория:

```bash
docker compose up -d
```

Локальный Postgres тоже можно: те же `DB_HOST` / `DB_PORT` / `DB_USERNAME` / `DB_PASSWORD` / `DB_NAME`, что в `nest/.env.example`.

### 2. Nest

```bash
cd nest
cp .env.example .env
```

В `.env` задай `JWT_SECRET` и проверь `CORS_ORIGIN=http://localhost:3000`.

```bash
npm i
npm run start:dev
```

API: http://localhost:3004

### 3. Next

```bash
cd next
cp .env.example .env.local
```

В `.env.local` должно быть:

```
NEXT_PUBLIC_API_URL=http://localhost:3004
```

```bash
npm i
npm run dev
```

UI: http://localhost:3000

## Сценарий проверки

1. Регистрация → вход.
2. Создать коллекцию, открыть её.
3. Добавить ссылку, тег, отфильтровать по статусу/тегу.
4. «Выйти» — токен пропадает, `/me` и коллекции снова требуют логин.

## Auth и API (кратко)

- `POST /auth/register` — регистрация
- `POST /auth/login` — JWT access token
- `GET /auth/me` — текущий пользователь
- CRUD collections / links / tags (только свои данные)

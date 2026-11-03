# LinkShelf — учебный план

## Идея продукта

**LinkShelf** — личная полка ссылок для обучения.

После логина пользователь:

- создаёт **коллекции** (например «Nest», «Next», «SQL»);
- кладёт в них **ссылки** (url, title, status: `todo` | `reading` | `done`);
- вешает **теги**;
- смотрит список / фильтр / карточку ссылки.

Верстка не важна. Важны роли компонентов, слои FSD, REST, auth, БД.

---

## Фазы

### Фаза 0 — Каркас репозитория
- Оставить монорепо: `full_stack/next` и `full_stack/nest`
- Корневой `README.md` с описанием идеи (текстом, без кода)
- `.gitignore` на корне (node_modules, .env, dist, .next)

### Фаза 1 — Инициализация Nest
- `nest new` **внутрь** папки `nest` (или создать и перенести — как удобнее, итог: код в `nest/`)
- Запуск `GET /` hello, проверка в браузере/curl
- Подключить ConfigModule
- Поднять PostgreSQL (Docker Compose в корне **или** локальный Postgres — на выбор)
- TypeORM + первая сущность `User`
- ValidationPipe глобально

### Фаза 2 — Auth (Nest)
- `POST /auth/register` — email + password (hash bcrypt)
- `POST /auth/login` — JWT access token
- `GET /auth/me` — текущий пользователь (JwtAuthGuard)
- DTO + class-validator
- Модули: `AuthModule`, `UsersModule`

### Фаза 3 — Доменные сущности (Nest)
- `Collection` (userId, title)
- `Link` (collectionId, title, url, status, userId)
- `Tag` + связь many-to-many с Link
- CRUD:
  - collections: list / create / update / delete (только свои)
  - links: list (фильтр collectionId, status, tag) / getOne / create / update / delete
  - tags: list / create
- Везде guard + проверка владельца

### Фаза 4 — Инициализация Next + FSD
- `create-next-app` в `next/` (App Router, TypeScript, без лишнего UI-kit)
- Слои FSD: `app` (или `src/app` next) + `src/{shared,entities,features,widgets,pages}` — согласовать с App Router: роуты в `app/`, UI-логика в FSD-слоях
- `shared/api` — базовый fetch к Nest (`NEXT_PUBLIC_API_URL`)
- Уродливые страницы: `/`, `/login`, `/register`

### Фаза 5 — Auth на фронте
- Формы login/register — **Client Components**
- Хранение токена (для учёбы: cookie httpOnly через Route Handler **или** localStorage — выбрать одно и зафиксировать)
- Редирект гостя с защищённых страниц (middleware и/или server check)
- Страница `/me` — данные с `GET /auth/me` через **Server Component**

### Фаза 6 — Collections & Links UI (Next практики)
- Список коллекций — Server Component + fetch
- Создание коллекции — Client Component (форма)
- Страница коллекции: список ссылок
- Фильтры status/tag — Client Component, влияющий на URL searchParams; список читает searchParams на сервере
- `loading.tsx` на сегментах списка
- `error.tsx` на сегменте коллекции
- Тяжёлый блок (например превью/статистика) — `next/dynamic` с `ssr: false` или lazy
- Хотя бы один виджет в `widgets/`, фича в `features/`, сущность в `entities/`

### Фаза 7 — Склейка и жёсткие края
- CORS на Nest под Next origin
- Обработка 401 на фронте → logout / login
- Пустые состояния, ошибки валидации с бэка
- Короткий README: как поднять DB, nest, next

### Фаза 8 (опционально)
- Refresh token
- Пагинация links
- Server Actions как BFF-прокси к Nest
- Простой E2E одного сценария (login → create link)

---

## Порядок обучения (важное)

1. Сначала **рабочий Nest + БД + auth**, потом фронт к живому API.
2. На Next сначала FSD-каркас и auth-страницы, потом CRUD UI.
3. Каждый шаг закрывается критерием «готово», без прыжков через фазы.

---

## Прогресс (обновляет ментор по ответам пользователя)

- [ ] 0 Каркас
- [ ] 1 Nest init + DB
- [ ] 2 Auth Nest
- [ ] 3 CRUD Nest
- [ ] 4 Next + FSD
- [ ] 5 Auth Next
- [ ] 6 UI Next practices
- [ ] 7 Склейка

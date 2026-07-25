# e-Giciro Backend

Express + Sequelize (SQLite) API for the e-Giciro price-comparison platform.

## Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev        # starts the API on http://localhost:5000
```

No separate migrate/seed step needed — the first time the server starts,
`database/init.js` automatically creates `database/e_giciro.sqlite`, runs
every migration, and seeds demo data. On later restarts it only applies any
new migrations and leaves existing data alone. Run `node database/init.js`
directly if you want to trigger this without starting the full server.

## Seeded accounts

| Phone        | Password    | Role         |
|--------------|-------------|--------------|
| 0788000000   | admin123    | admin        |
| 0788111111   | password123 | consumer     |
| 0788222222   | password123 | shop_owner   |
| 0788333333   | password123 | wholesaler   |
| 0788444444   | password123 | manufacturer |
| 0788555555   | password123 | shop_owner   |

## API overview

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET  /api/auth/me` (auth)
- `GET  /api/offers` (filters: product_name, category, district, type, min_price, max_price, sort, page, limit)
- `GET  /api/offers/averages` (average price per district)
- `GET  /api/offers/mine` (auth)
- `GET  /api/offers/:id`
- `POST /api/offers` (auth)
- `PUT  /api/offers/:id` (auth, owner or admin)
- `DELETE /api/offers/:id` (auth, owner or admin)
- `GET  /api/notifications` (auth)
- `PATCH /api/notifications/:id/read` (auth)
- `PATCH /api/notifications/read-all` (auth)
- `GET  /api/admin/stats` (admin)
- `GET  /api/admin/users` (admin)
- `DELETE /api/admin/users/:id` (admin)
- `GET  /api/admin/offers` (admin)
- `DELETE /api/admin/offers/:id` (admin)

## Resetting the database

```bash
npm run db:reset
```

# e-Giciro

A location-aware, real-time price comparison platform for Rwanda. Consumers,
shop owners, wholesalers, and manufacturers post and compare prices for
everyday goods — rice, cooking oil, sugar, maize flour, and more — across
Rwanda's districts.

> Built as a full-stack demonstration project for an Introduction to Software
> Engineering course at ALU.

## Tech stack

| Layer      | Technology                                   |
|------------|-----------------------------------------------|
| Frontend   | React 18 + Vite, Tailwind CSS, React Router, Leaflet.js |
| Backend    | Node.js + Express                            |
| Database   | SQLite via Sequelize ORM                     |
| Auth       | JWT (JSON Web Tokens)                        |
| Mapping    | Leaflet.js + OpenStreetMap tiles             |

## Project structure

```
e-giciro/
├── backend/     Express API, Sequelize models, migrations, seeders
├── frontend/    React + Vite single-page application
└── docker-compose.yml
```

See `backend/README.md` and the component tree under `frontend/src` for
details on each layer.

## Quick start (local, without Docker)

### 1. Clone and enter the project

```bash
git clone <your-repo-url> e-giciro
cd e-giciro
```

### 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env
npm run setup       # runs migrations, then seeds demo data
npm run dev         # starts the API on http://localhost:5000
```

### 3. Frontend setup (in a second terminal)

```bash
cd frontend
npm install
cp .env.example .env
npm run dev          # starts the app on http://localhost:5173
```

Open `http://localhost:5173` in your browser. The frontend talks to the API
at the URL configured in `frontend/.env` (`VITE_API_URL`).

### 4. Log in with a seeded account

| Phone        | Password    | Role         |
|--------------|-------------|--------------|
| 0788000000   | admin123    | admin        |
| 0788111111   | password123 | consumer     |
| 0788222222   | password123 | shop_owner   |
| 0788333333   | password123 | wholesaler   |
| 0788444444   | password123 | manufacturer |
| 0788555555   | password123 | shop_owner   |

Or register a new account from the app itself.

## Running with Docker Compose

```bash
docker compose up --build
```

This builds and starts both services: the API on `http://localhost:5000`
and the frontend preview server on `http://localhost:5173`. The SQLite
database is persisted in a Docker volume (`backend-db`) so data survives
container restarts.

## Building for production

```bash
# Backend — no build step, just run with NODE_ENV=production
cd backend
NODE_ENV=production npm start

# Frontend — produces a static bundle in frontend/dist
cd frontend
npm run build
npm run preview      # serves the production build locally for a final check
```

Deploy the contents of `frontend/dist` to any static host (Netlify, Vercel,
S3 + CloudFront, etc.), and point `VITE_API_URL` at your deployed backend's
address before running the build.

## Resetting the database

```bash
cd backend
npm run db:reset     # drops all tables, re-runs migrations and seeders
```

## Core features

- **Authentication** — phone-number + password registration and login,
  JWT-protected routes, role-based access (consumer, shop owner, wholesaler,
  manufacturer, admin).
- **Offer management** — post, edit, and delete buy/sell offers with
  product, category, price, description, and district.
- **Price comparison** — filter offers by product, category, district, type,
  and price range; see live average prices per district.
- **Interactive map** — every offer with coordinates appears as a marker on
  a Leaflet/OpenStreetMap view of Rwanda.
- **Notifications** — posting an offer automatically notifies users with a
  matching opposite-type offer in the same district and category.
- **Admin dashboard** — platform-wide statistics, user management, and
  offer moderation.

## License

MIT — built for educational purposes.

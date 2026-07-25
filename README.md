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
├── backend/       Express API, Sequelize models, migrations, seeders
│   └── database/  SQLite file lives here (auto-created — see init.js)
├── frontend/      React + Vite single-page application
├── setup.sh       One-time install (deps + .env files)
├── start.sh       Single command: install (if needed) + run everything
└── docker-compose.yml
```

## Fastest way to run it (one command)

```bash
git clone <your-repo-url> e-giciro
cd e-giciro
./start.sh
```

That's it. `start.sh` installs backend and frontend dependencies (only if
`node_modules` is missing), creates `.env` files from the examples (only if
they don't already exist), starts the backend, waits for it to be healthy,
then starts the frontend dev server. The database file is created and
seeded automatically the first time the backend runs — see
`backend/database/init.js`.

Open **http://localhost:5173** and log in with a seeded account:

| Phone        | Password    | Role         |
|--------------|-------------|--------------|
| 0788000000   | admin123    | admin        |
| 0788111111   | password123 | consumer     |
| 0788222222   | password123 | shop_owner   |
| 0788333333   | password123 | wholesaler   |
| 0788444444   | password123 | manufacturer |
| 0788555555   | password123 | shop_owner   |

Press `Ctrl+C` once to stop both the frontend and the backend — `start.sh`
traps the signal and shuts both processes down cleanly.

If you only want to install dependencies and set up `.env` files without
starting anything (e.g. before editing config), run `./setup.sh` on its own.

> **Windows users:** these are bash scripts. Run them from Git Bash, WSL, or
> follow the manual step-by-step instructions below using PowerShell/cmd.

## Manual setup (step by step, no scripts)

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

The first time this runs, `database/init.js` creates `database/e_giciro.sqlite`,
runs all migrations, and seeds demo data automatically. The API listens on
`http://localhost:5000`.

### 2. Frontend (second terminal)

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Leave `VITE_API_URL` blank in `frontend/.env` for local development — the
Vite dev server proxies any request to `/api/*` straight through to
`http://localhost:5000` (configured in `frontend/vite.config.js`), so the
browser never makes a cross-origin request and no CORS setup is needed in
development.

Open `http://localhost:5173`.

## Known issues fixed / things to watch for

- **Dev-server proxy**: earlier versions of this project pointed the
  frontend directly at `http://localhost:5000/api`, which works but forces a
  CORS round-trip on every request. `vite.config.js` now proxies `/api` to
  the backend, and `frontend/src/utils/api.js` defaults to the relative path
  `/api` — set `VITE_API_URL` only when deploying frontend and backend to
  different hosts.
- **Automatic database bootstrap**: `backend/src/app.js` calls
  `ensureDatabase()` from `backend/database/init.js` on every startup. On a
  brand-new clone this creates the SQLite file, runs migrations, and seeds
  demo data; on subsequent runs it only applies any new migrations and never
  touches existing data. You no longer need to remember to run
  `npm run setup` manually — it happens automatically.
- **Two independent `npm install`s**: the backend and frontend are separate
  Node projects with separate `package.json` files (not an npm workspace),
  so each needs its own `npm install`. `setup.sh` and `start.sh` handle this
  for you.
- **JWT_SECRET**: the `.env.example` ships with a placeholder. It's fine for
  local development, but generate a real random value before deploying
  anywhere public (see Production deployment below).

## Running with Docker Compose

```bash
docker compose up --build
```

This builds and starts both services: the API on `http://localhost:5000`
and the frontend preview server on `http://localhost:5173`. The backend
container runs `npm start`, which triggers the same automatic database
bootstrap described above — the SQLite file is created inside the
`backend-db` Docker volume on first run, so data survives container
restarts and rebuilds.

To stop everything: `docker compose down` (add `-v` to also delete the
database volume and start fresh).

## Production deployment, step by step

This app deploys as two independent pieces: a Node.js API and a static
frontend bundle. Any combination of Node host + static host works; below is
one concrete, common path.

### Step 1 — Prepare the backend for production

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```
NODE_ENV=production
JWT_SECRET=<generate with: openssl rand -base64 48>
CLIENT_ORIGIN=https://your-frontend-domain.com
```

### Step 2 — Deploy the backend (choose one)

**Option A — VPS with PM2** (simple, full control):
```bash
npm install -g pm2
cd backend
npm install
pm2 start src/app.js --name e-giciro-api
pm2 save
pm2 startup   # follow the printed instructions to survive reboots
```
Put Nginx or Caddy in front of it as a reverse proxy for HTTPS.

**Option B — Render / Railway / Fly.io** (managed):
- Point the service at the `backend/` folder.
- Build command: `npm install`
- Start command: `npm start`
- Set the environment variables from `.env` in the platform's dashboard.
- Attach a persistent volume/disk mounted at `backend/database` — SQLite
  needs a writable, persistent filesystem, which most serverless platforms
  don't provide by default. If your platform is serverless-only (no
  persistent disk), switch to a hosted database (see note below).

**Option C — Docker**: build and push `backend/Dockerfile` to any container
host (Fly.io, Railway, a VPS running Docker, ECS, etc.), mounting a volume
at `/app/database`.

> **Note on SQLite in production:** SQLite is a single file on disk, which
> is perfect for this course project but doesn't scale to multiple server
> instances or ephemeral/serverless hosting. If you outgrow it, the
> Sequelize models and migrations in this project port to PostgreSQL or
> MySQL with only a config change (swap `dialect: 'sqlite'` for `'postgres'`
> and add connection credentials) — no application code changes needed.

### Step 3 — Deploy the frontend

```bash
cd frontend
```

Edit `frontend/.env`:
```
VITE_API_URL=https://your-backend-domain.com/api
```

Then build and deploy the static bundle:
```bash
npm install
npm run build
```

This produces `frontend/dist/` — deploy that folder to any static host:

- **Netlify / Vercel**: connect the repo, set the base directory to
  `frontend`, build command `npm run build`, publish directory `dist`, and
  add the `VITE_API_URL` environment variable in their dashboard.
- **Any static host (S3 + CloudFront, GitHub Pages, Nginx)**: upload the
  contents of `frontend/dist` directly.

### Step 4 — Verify

- Visit your frontend URL and confirm the landing page loads.
- Log in with the seeded admin account and confirm offers load (this proves
  the frontend is reaching the backend correctly).
- Check `https://your-backend-domain.com/api/health` returns
  `{"success":true,...}`.

### Step 5 — Ongoing maintenance

- To apply new migrations after a deploy: `npm run db:migrate` on the
  backend host (or just restart the process — `ensureDatabase()` runs on
  every boot and applies any pending migrations automatically).
- Back up `backend/database/e_giciro.sqlite` regularly if you're not using a
  managed database.

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

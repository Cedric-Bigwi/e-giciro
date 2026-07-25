/**
 * Ensures the SQLite database exists and is fully migrated before the app
 * starts accepting requests. This is what makes the backend "just work" the
 * first time it's ever started — no manual `db:migrate` step required.
 *
 * - If the database file doesn't exist yet: create the folder, run every
 *   migration, then seed demo data (users, offers, notifications).
 * - If the database file already exists: just run any migrations that
 *   haven't been applied yet (safe and idempotent — Sequelize tracks
 *   applied migrations in a SequelizeMeta table, so this is a no-op when
 *   everything is already up to date). Existing data is never touched or
 *   re-seeded.
 *
 * Can also be run directly: `node database/init.js`
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const BACKEND_ROOT = path.resolve(__dirname, '..');
require('dotenv').config({ path: path.join(BACKEND_ROOT, '.env') });

const storageRelative = process.env.DB_STORAGE || './database/e_giciro.sqlite';
const storagePath = path.resolve(BACKEND_ROOT, storageRelative.replace(/^\.\//, ''));

function run(command) {
  execSync(command, { cwd: BACKEND_ROOT, stdio: 'inherit', env: process.env });
}

function ensureDatabase() {
  const dbDir = path.dirname(storagePath);
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  const isFirstRun = !fs.existsSync(storagePath);

  console.log(
    isFirstRun
      ? `[db:init] No database found at ${storagePath} — creating it now.`
      : `[db:init] Database found at ${storagePath} — checking for pending migrations.`
  );

  try {
    run('npx sequelize-cli db:migrate');
  } catch (err) {
    throw new Error(
      `[db:init] Migrations failed. If you just changed .env, delete the database file and retry. Original error: ${err.message}`
    );
  }

  if (isFirstRun) {
    console.log('[db:init] Fresh database — seeding demo users, offers, and notifications.');
    try {
      run('npx sequelize-cli db:seed:all');
    } catch (err) {
      throw new Error(`[db:init] Seeding failed: ${err.message}`);
    }
  }

  console.log('[db:init] Database is ready.');
}

if (require.main === module) {
  try {
    ensureDatabase();
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

module.exports = { ensureDatabase, storagePath };

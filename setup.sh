#!/usr/bin/env bash
#
# setup.sh — one-time environment setup for e-Giciro.
# Installs backend + frontend dependencies and creates .env files from the
# provided examples if they don't already exist. Safe to re-run at any time
# (it never overwrites an existing .env, and npm install is a no-op if
# node_modules is already up to date).

set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$ROOT_DIR/backend"
FRONTEND_DIR="$ROOT_DIR/frontend"

echo "=================================================="
echo " e-Giciro — Setup"
echo "=================================================="

if ! command -v node >/dev/null 2>&1; then
  echo "Error: Node.js is not installed. Install Node.js 18+ from https://nodejs.org and re-run this script."
  exit 1
fi

NODE_MAJOR=$(node -v | sed -E 's/^v([0-9]+).*/\1/')
if [ "$NODE_MAJOR" -lt 18 ]; then
  echo "Error: Node.js 18+ is required (found $(node -v)). Please upgrade Node.js."
  exit 1
fi

# --- Backend ---
echo
echo "-- Backend --"
cd "$BACKEND_DIR"

if [ ! -f .env ]; then
  cp .env.example .env
  echo "Created backend/.env from .env.example"
else
  echo "backend/.env already exists — leaving it untouched"
fi

if [ ! -d node_modules ]; then
  echo "Installing backend dependencies…"
  npm install
else
  echo "backend/node_modules already present — skipping install (delete it to force a clean install)"
fi

# --- Frontend ---
echo
echo "-- Frontend --"
cd "$FRONTEND_DIR"

if [ ! -f .env ]; then
  cp .env.example .env
  echo "Created frontend/.env from .env.example"
else
  echo "frontend/.env already exists — leaving it untouched"
fi

if [ ! -d node_modules ]; then
  echo "Installing frontend dependencies…"
  npm install
else
  echo "frontend/node_modules already present — skipping install (delete it to force a clean install)"
fi

echo
echo "=================================================="
echo " Setup complete."
echo " The database itself is created automatically the"
echo " first time the backend starts — nothing more to do."
echo " Run ./start.sh to launch the app."
echo "=================================================="

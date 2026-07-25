#!/usr/bin/env bash
#
# start.sh — the one command that installs everything (if needed) and runs
# the full e-Giciro application:
#
#   ./start.sh
#
# It runs setup.sh first (idempotent — safe even if already set up), then
# starts the backend API in the background and the frontend dev server in
# the foreground. Press Ctrl+C to stop both.

set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$ROOT_DIR/backend"
FRONTEND_DIR="$ROOT_DIR/frontend"
BACKEND_LOG="$ROOT_DIR/backend.log"

bash "$ROOT_DIR/setup.sh"

echo
echo "=================================================="
echo " Starting e-Giciro"
echo "=================================================="

# --- Start backend ---
cd "$BACKEND_DIR"
echo "Starting backend API (logs: backend.log)…"
npm start > "$BACKEND_LOG" 2>&1 &
BACKEND_PID=$!

cleanup() {
  echo
  echo "Shutting down…"
  if kill -0 "$BACKEND_PID" 2>/dev/null; then
    kill "$BACKEND_PID" 2>/dev/null || true
  fi
}
trap cleanup EXIT INT TERM

# --- Wait for the backend health check ---
echo -n "Waiting for the backend to be ready"
READY=0
for i in $(seq 1 30); do
  if curl -s http://localhost:5000/api/health >/dev/null 2>&1; then
    READY=1
    break
  fi
  echo -n "."
  sleep 1
done
echo

if [ "$READY" -ne 1 ]; then
  echo "Backend did not respond in time. Check backend.log for details:"
  echo "----------------------------------------"
  tail -n 40 "$BACKEND_LOG" || true
  echo "----------------------------------------"
  exit 1
fi

echo "Backend is up: http://localhost:5000"
echo "Demo admin login: 0788000000 / admin123"
echo

# --- Start frontend (foreground) ---
cd "$FRONTEND_DIR"
echo "Starting frontend dev server: http://localhost:5173"
echo "(Ctrl+C stops both the frontend and the backend)"
echo "=================================================="
npm run dev

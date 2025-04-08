#!/bin/sh

if [ ! -f "/app/seed-executed.lock" ]; then
  echo "Rodando seed"
  npx prisma db push
  npm run seed
  touch /app/seed-executed.lock
else
  echo "Seed já foi executada, pulando..."
fi

npm start

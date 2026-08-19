# Personal Page Server

This server handles contact form submissions and syncs them to a Neon database.

## Features

- Contact form endpoint (`/api/contact`)
- Queue-based processing every 15 minutes
- Database sync to Neon PostgreSQL

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy the environment template and configure:
   ```bash
   cp .env-template .env
   ```

3. Set `DATABASE_URL` in `.env`.

## Usage

Start the server:

```bash
node index.js
```

## How It Works

1. Contact form submissions are added to a local queue (`queue.json`)
2. Every 15 minutes, the queue is processed:
   - Entries are synced to the Neon database
   - Failed entries remain in the queue for retry

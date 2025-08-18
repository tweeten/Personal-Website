# Personal Page Server

This server handles contact form submissions and syncs them to a Neon database, with email notifications for new entries.

## Features

- Contact form endpoint (`/api/contact`)
- Queue-based processing every 15 minutes
- Database sync to Neon PostgreSQL
- Email notifications for new contact entries
- Test email endpoint (`/api/test-email`)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy the environment template and configure:
   ```bash
   cp .env-template .env
   ```

3. Edit `.env` with your email configuration:
   ```env
   # Email Configuration
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_TO=your-notification-email@example.com
   EMAIL_FROM=your-email@gmail.com
   ```

## Email Setup (Gmail Example)

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
   - Use this password in `EMAIL_PASS`

## Usage

1. Start the server:
   ```bash
   node index.js
   ```

2. Test email configuration:
   ```bash
   curl -X POST http://localhost:5000/api/test-email
   ```

3. Submit a contact form to test the full flow

## How It Works

1. Contact form submissions are added to a local queue (`queue.json`)
2. Every 15 minutes, the queue is processed:
   - Entries are synced to Neon database
   - Successful entries trigger email notifications
   - Failed entries remain in queue for retry
3. Email notifications include:
   - Name, email, message, and timestamp
   - Formatted for both text and HTML
   - Sent to your specified notification email

## Troubleshooting

- Check console logs for email errors
- Verify environment variables are set correctly
- Test email configuration with `/api/test-email` endpoint
- Ensure your email provider allows SMTP connections

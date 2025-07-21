const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;


const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_q9bCXRVGLD1r@ep-falling-recipe-afn2vfbg-pooler.c-2.us-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  idleTimeoutMillis: 300000
});

app.use(cors());
app.use(express.json());

const QUEUE_FILE = path.join(__dirname, 'queue.json');

// Ensure queue.json exists
if (!fs.existsSync(QUEUE_FILE)) {
  fs.writeFileSync(QUEUE_FILE, '[]', 'utf8');
}

// Helper to read queue
function readQueue() {
  try {
    const data = fs.readFileSync(QUEUE_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading queue:', err);
    return [];
  }
}

// Helper to write queue
function writeQueue(queue) {
  try {
    fs.writeFileSync(QUEUE_FILE, JSON.stringify(queue, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing queue:', err);
  }
}

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  // Add to queue
  const queue = readQueue();
  queue.push({ name, email, message, created_at: new Date().toISOString() });
  writeQueue(queue);
  // Respond immediately
  res.status(200).json({ success: true });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Background job: every 15 minutes
setInterval(async () => {
  let queue = readQueue();
  if (queue.length === 0) return;
  const newQueue = [];
  for (const item of queue) {
    try {
      await pool.query(
        'INSERT INTO contact_messages (name, email, message, created_at) VALUES ($1, $2, $3, $4)',
        [item.name, item.email, item.message, item.created_at]
      );
      // Success: do not re-add to newQueue
    } catch (err) {
      console.error('Failed to sync queued message:', err);
      newQueue.push(item); // Keep in queue for next attempt
    }
  }
  writeQueue(newQueue);
}, 15 * 60 * 1000); // 15 minutes

setInterval(async () => {
  try {
    // This simple query is enough to keep the connection alive
    await pool.query('SELECT 1');
  } catch (err) {
    console.error('Keep-alive query failed:', err);
  }
}, 240000); // 4 minutes
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 5000;


const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_q9bCXRVGLD1r@ep-falling-recipe-afn2vfbg-pooler.c-2.us-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  idleTimeoutMillis: 300000
});

app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    // Create table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    // Insert the form data
    await pool.query(
      'INSERT INTO contact_messages (name, email, message) VALUES ($1, $2, $3)',
      [name, email, message]
    );

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error saving contact message:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

setInterval(async () => {
  try {
    // This simple query is enough to keep the connection alive
    await pool.query('SELECT 1');
  } catch (err) {
    console.error('Keep-alive query failed:', err);
  }
}, 240000); // 4 minutes
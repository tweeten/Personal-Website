const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const { sendContactNotification } = require('./emailService');

const app = express();
const port = process.env.PORT || 5003;


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

console.log('QUEUE_FILE path:', QUEUE_FILE);

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
    console.log('Attempting to write to queue.json at:', QUEUE_FILE);
    fs.writeFileSync(QUEUE_FILE, JSON.stringify(queue, null, 2), 'utf8');
    console.log('Successfully wrote to queue.json');
  } catch (err) {
    console.error('Error writing queue:', err);
  }
}

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  console.log('Received form submission:', req.body);
  // Add to queue
  const queue = readQueue();
  console.log('Queue before append:', queue);
  queue.push({ name, email, message, created_at: new Date().toISOString() });
  writeQueue(queue);
  console.log('Queue after append:', queue);
  // Respond immediately
  res.status(200).json({ success: true });
});

// Test email configuration endpoint
app.post('/api/test-email', async (req, res) => {
  try {
    const { sendContactNotification, testEmailConfig } = require('./emailService');
    
    // Test configuration first
    const configValid = await testEmailConfig();
    if (!configValid) {
      return res.status(500).json({ 
        success: false, 
        error: 'Email configuration is invalid. Check your environment variables.' 
      });
    }
    
    // Send test email
    const testEntry = {
      name: 'Test User',
      email: 'test@example.com',
      message: 'This is a test message to verify email notifications are working.',
      created_at: new Date().toISOString()
    };
    
    await sendContactNotification([testEntry]);
    
    res.status(200).json({ 
      success: true, 
      message: 'Test email sent successfully. Check your inbox.' 
    });
  } catch (error) {
    console.error('Test email failed:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Debug endpoint to check environment variables
app.get('/api/debug-env', (req, res) => {
  const emailVars = {
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_PORT: process.env.EMAIL_PORT,
    EMAIL_USER: process.env.EMAIL_USER ? '***SET***' : 'NOT SET',
    EMAIL_PASS: process.env.EMAIL_PASS ? '***SET***' : 'NOT SET',
    EMAIL_TO: process.env.EMAIL_TO,
    EMAIL_FROM: process.env.EMAIL_FROM,
    PORT: process.env.PORT
  };
  
  res.json({
    success: true,
    environment: emailVars,
    message: 'Check if all required email variables are set'
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Background job: every 15 minutes
setInterval(async () => {
  let queue = readQueue();
  if (queue.length === 0) return;
  
  const processedEntries = [];
  const newQueue = [];
  
  for (const item of queue) {
    try {
      await pool.query(
        'INSERT INTO contact_messages (name, email, message, created_at) VALUES ($1, $2, $3, $4)',
        [item.name, item.email, item.message, item.created_at]
      );
      // Success: add to processed entries for email notification
      processedEntries.push(item);
    } catch (err) {
      console.error('Failed to sync queued message:', err);
      newQueue.push(item); // Keep in queue for next attempt
    }
  }
  
  // Send email notification if there are processed entries
  if (processedEntries.length > 0) {
    try {
      await sendContactNotification(processedEntries);
      console.log(`Email notification sent for ${processedEntries.length} processed entries`);
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
      // Don't fail the queue processing if email fails
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
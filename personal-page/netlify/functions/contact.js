const { Pool } = require('pg');

const corsHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function json(statusCode, body) {
  return {
    statusCode,
    headers: corsHeaders,
    body: JSON.stringify(body),
  };
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return json(200, { ok: true });
  }

  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method Not Allowed' });
  }

  let name;
  let email;
  let message;
  try {
    ({ name, email, message } = JSON.parse(event.body || '{}'));
  } catch {
    return json(400, { success: false, error: 'Invalid JSON body' });
  }

  if (!name || !email || !message) {
    return json(400, {
      success: false,
      error: 'Missing required fields: name, email, and message are required',
    });
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    const result = await pool.query(
      'INSERT INTO contact_messages (name, email, message, created_at) VALUES ($1, $2, $3, $4) RETURNING id',
      [name, email, message, new Date().toISOString()]
    );

    return json(200, {
      success: true,
      message: 'Contact form submitted successfully',
      id: result.rows[0].id,
    });
  } catch (error) {
    console.error('Failed to process contact form:', error);
    return json(500, {
      success: false,
      error: 'Failed to process contact form submission',
    });
  } finally {
    await pool.end();
  }
};

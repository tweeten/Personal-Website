const { Pool } = require('pg');

exports.handler = async (event, context) => {
  // Only allow GET requests for testing
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
  }

  try {
    // Create database connection pool
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    });

    // Test database connection with a simple query
    const result = await pool.query('SELECT NOW() as current_time, version() as db_version');
    
    // Close database connection
    await pool.end();

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        message: 'Database connection successful',
        currentTime: result.rows[0].current_time,
        dbVersion: result.rows[0].db_version,
        databaseUrl: process.env.DATABASE_URL ? '***SET***' : 'NOT SET'
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };

  } catch (error) {
    console.error('Database connection failed:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false, 
        error: 'Database connection failed',
        details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
        databaseUrl: process.env.DATABASE_URL ? '***SET***' : 'NOT SET'
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
  }
};

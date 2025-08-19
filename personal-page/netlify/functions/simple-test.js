exports.handler = async (event, context) => {
  try {
    // Test if we can require nodemailer
    const nodemailer = require('nodemailer');
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Nodemailer loaded successfully',
        nodemailerVersion: nodemailer.version || 'unknown'
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: 'Failed to load nodemailer',
        details: error.message,
        stack: error.stack
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
  }
};

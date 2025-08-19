exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      environment: {
        EMAIL_HOST: process.env.EMAIL_HOST || 'NOT SET',
        EMAIL_PORT: process.env.EMAIL_PORT || 'NOT SET',
        EMAIL_USER: process.env.EMAIL_USER ? 'SET (length: ' + process.env.EMAIL_USER.length + ')' : 'NOT SET',
        EMAIL_PASS: process.env.EMAIL_PASS ? 'SET (length: ' + process.env.EMAIL_PASS.length + ')' : 'NOT SET',
        EMAIL_TO: process.env.EMAIL_TO || 'NOT SET',
        EMAIL_FROM: process.env.EMAIL_FROM || 'NOT SET',
        NODE_ENV: process.env.NODE_ENV || 'NOT SET'
      },
      message: 'Environment variables check'
    }),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  };
};

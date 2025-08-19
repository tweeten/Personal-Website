# Netlify Migration Guide

## Overview
This project has been migrated from a standalone Express server to Netlify Functions for serverless deployment.

## What Changed

### Before (Express Server)
- Required persistent server running on port 5003
- Contact form submissions went to `http://localhost:5003/api/contact`
- Server needed to be running 24/7

### After (Netlify Functions)
- Serverless functions that run only when called
- Contact form submissions go to `/api/contact` (handled by Netlify)
- No persistent server needed

## Files Added
- `netlify/functions/contact.js` - Handles contact form submissions
- `netlify/functions/test-email.js` - Tests email configuration
- `netlify.toml` - Netlify configuration
- `netlify/functions/package.json` - Dependencies for functions

## Deployment Steps

### 1. Build Your Project
```bash
npm run build
```

### 2. Deploy to Netlify
- Connect your GitHub repository to Netlify
- Set build command: `npm run build`
- Set publish directory: `dist`

### 3. Set Environment Variables
In Netlify dashboard → Site Settings → Environment Variables, add:

```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-gmail-app-password
EMAIL_TO=where-to-send-notifications@example.com
EMAIL_FROM=your-gmail@gmail.com
```

### 4. Test the Functions
- Test contact form: Submit a form on your website
- Test email function: POST to `/.netlify/functions/test-email`

## How It Works

1. **Contact Form Submission**: User submits form → POST to `/api/contact`
2. **Netlify Routing**: Netlify routes `/api/*` to `/.netlify/functions/*`
3. **Function Execution**: `contact.js` function runs, sends email, returns response
4. **No Persistent Server**: Function stops running after completion

## Benefits
- ✅ No server costs
- ✅ Automatic scaling
- ✅ Built-in CDN
- ✅ Easy deployment
- ✅ Same functionality as before

## Troubleshooting

### Function Not Found
- Check `netlify.toml` configuration
- Ensure functions are in `netlify/functions/` directory

### Email Not Sending
- Verify environment variables are set in Netlify
- Check function logs in Netlify dashboard
- Test with `/api/test-email` endpoint

### CORS Issues
- Functions include CORS headers
- Check browser console for errors

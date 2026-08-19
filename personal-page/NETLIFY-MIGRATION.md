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
- `netlify.toml` - Netlify configuration

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
DATABASE_URL=postgresql://USER:PASSWORD@HOST/neondb?sslmode=require
```

### 4. Test the Functions
- Test contact form: Submit a form on your website

## How It Works

1. **Contact Form Submission**: User submits form → POST to `/api/contact`
2. **Netlify Routing**: Netlify routes `/api/*` to `/.netlify/functions/*`
3. **Function Execution**: `contact.js` stores the message in Neon and returns a response
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

### CORS Issues
- Functions include CORS headers
- Check browser console for errors

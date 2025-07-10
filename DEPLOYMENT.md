# Deployment Guide

This guide will help you deploy the Student Registration System to various platforms.

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- Git repository set up

## Option 1: GitHub Pages (Recommended)

### Step 1: Install gh-pages
```bash
npm install --save-dev gh-pages
```

### Step 2: Update package.json
Make sure your `package.json` has the following:
```json
{
  "homepage": "https://yourusername.github.io/student_registration_system",
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

### Step 3: Deploy
```bash
npm run deploy
```

### Step 4: Configure GitHub Pages
1. Go to your GitHub repository
2. Click on "Settings"
3. Scroll down to "GitHub Pages" section
4. Select "gh-pages" branch as source
5. Save the settings

Your app will be available at: `https://yourusername.github.io/student_registration_system`

## Option 2: Netlify

### Step 1: Build the project
```bash
npm run build
```

### Step 2: Deploy to Netlify
1. Go to [netlify.com](https://netlify.com)
2. Sign up/Login with your GitHub account
3. Click "New site from Git"
4. Select your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

### Step 3: Custom Domain (Optional)
1. Go to "Domain settings" in your Netlify dashboard
2. Add your custom domain
3. Follow the DNS configuration instructions

## Option 3: Vercel

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Deploy
```bash
vercel
```

Follow the prompts to configure your deployment.

### Step 3: Automatic Deployments
1. Connect your GitHub repository to Vercel
2. Vercel will automatically deploy on every push to main branch

## Option 4: Firebase Hosting

### Step 1: Install Firebase CLI
```bash
npm install -g firebase-tools
```

### Step 2: Login to Firebase
```bash
firebase login
```

### Step 3: Initialize Firebase
```bash
firebase init hosting
```

### Step 4: Configure Firebase
- Select your project
- Set public directory to `dist`
- Configure as single-page app: `Yes`
- Don't overwrite index.html: `No`

### Step 5: Deploy
```bash
npm run build
firebase deploy
```

## Environment Variables

If you need to add environment variables for production:

### Create .env.production
```bash
VITE_API_URL=https://your-api-url.com
VITE_APP_TITLE=Student Registration System
```

### Access in code
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
const appTitle = import.meta.env.VITE_APP_TITLE;
```

## Troubleshooting

### Common Issues

1. **Build fails**
   - Check for syntax errors
   - Ensure all dependencies are installed
   - Clear node_modules and reinstall

2. **Routing issues**
   - Ensure you're using HashRouter for GitHub Pages
   - Configure redirects for SPA routing

3. **Assets not loading**
   - Check file paths are correct
   - Ensure assets are in the public folder

### Performance Optimization

1. **Enable compression**
   - Configure gzip compression on your hosting platform

2. **Optimize images**
   - Use WebP format where possible
   - Compress images before adding to project

3. **Enable caching**
   - Set appropriate cache headers
   - Use service workers for offline functionality

## Monitoring

### Analytics
Add Google Analytics or similar:
```html
<!-- In index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Error Tracking
Add error tracking service like Sentry:
```bash
npm install @sentry/react
```

## Security Considerations

1. **HTTPS Only**
   - Ensure your hosting platform serves over HTTPS
   - Redirect HTTP to HTTPS

2. **Content Security Policy**
   - Add CSP headers to prevent XSS attacks
   - Configure allowed sources for scripts and styles

3. **Environment Variables**
   - Never commit sensitive data to version control
   - Use environment variables for configuration

## Backup Strategy

1. **Code Backup**
   - Use Git for version control
   - Push to multiple remotes if needed

2. **Data Backup**
   - Export localStorage data periodically
   - Consider implementing cloud backup for user data

## Support

If you encounter deployment issues:
1. Check the hosting platform's documentation
2. Review build logs for errors
3. Test locally with `npm run build` first
4. Check browser console for runtime errors 
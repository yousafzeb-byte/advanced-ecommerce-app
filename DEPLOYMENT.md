# Deployment Guide

This guide provides instructions for deploying your Advanced E-Commerce Web Application to various hosting platforms.

## Prerequisites

- Git repository (GitHub, GitLab, Bitbucket)
- Node.js 16+ installed locally
- Project builds successfully (`npm run build`)

## Option 1: Vercel (Recommended)

Vercel offers seamless integration with Vite projects.

### Steps:

1. **Push to GitHub**

   ```bash
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**

   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository
   - Vercel auto-detects Vite configuration
   - Click "Deploy"

3. **Environment Variables**
   - No environment variables needed for this project
   - API calls use direct URLs to FakeStore API

### Build Settings (Auto-detected):

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

---

## Option 2: Netlify

### Steps:

1. **Push to GitHub** (if not already done)

   ```bash
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy to Netlify**

   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect to GitHub and select your repository
   - Configure build settings:
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`
   - Click "Deploy site"

3. **Configure Redirects** (for React Router)

   Create `public/_redirects` file:

   ```
   /*    /index.html   200
   ```

---

## Option 3: GitHub Pages

### Steps:

1. **Install gh-pages**

   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**

   Add homepage and deploy scripts:

   ```json
   {
     "homepage": "https://<username>.github.io/<repo-name>",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Update vite.config.js**

   ```javascript
   export default defineConfig({
     plugins: [react()],
     base: "/<repo-name>/", // Add this line
   });
   ```

4. **Deploy**

   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**
   - Go to repository settings
   - Navigate to "Pages"
   - Select `gh-pages` branch as source
   - Save

---

## Option 4: Railway

### Steps:

1. **Create railway.json** in project root:

   ```json
   {
     "build": {
       "builder": "NIXPACKS"
     },
     "deploy": {
       "numReplicas": 1,
       "startCommand": "npm run preview",
       "restartPolicyType": "ON_FAILURE"
     }
   }
   ```

2. **Deploy**
   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Select your repository
   - Railway auto-deploys on push

---

## Option 5: Render

### Steps:

1. **Push to GitHub** (if not already done)

2. **Deploy to Render**
   - Go to [render.com](https://render.com)
   - Click "New Static Site"
   - Connect to GitHub repository
   - Configure:
     - **Build Command**: `npm run build`
     - **Publish Directory**: `dist`
   - Click "Create Static Site"

---

## Build Optimization

### Before deploying, optimize your build:

1. **Check bundle size**

   ```bash
   npm run build
   ```

   Review the output for large chunks.

2. **Analyze bundle** (optional)

   Install analyzer:

   ```bash
   npm install --save-dev rollup-plugin-visualizer
   ```

   Update vite.config.js:

   ```javascript
   import { visualizer } from "rollup-plugin-visualizer";

   export default defineConfig({
     plugins: [react(), visualizer({ open: true })],
   });
   ```

3. **Production build**
   ```bash
   npm run build
   ```

---

## Post-Deployment Checklist

- [ ] All routes work correctly (Home, Cart)
- [ ] Images load (with fallback for 404s)
- [ ] Category dropdown populates
- [ ] Add to cart functionality works
- [ ] Shopping cart persists on refresh
- [ ] Checkout clears cart
- [ ] Mobile responsive design works
- [ ] No console errors in production

---

## Troubleshooting

### Routes return 404

- Configure redirect rules for your hosting platform
- Ensure React Router is in BrowserRouter mode

### Images not loading

- Check CORS policies
- Verify FakeStore API is accessible
- Fallback placeholders should work automatically

### sessionStorage not working

- Check if hosting platform blocks sessionStorage
- Verify no privacy/security settings blocking storage

### Build fails

- Check Node.js version (requires 16+)
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check for any missing dependencies

---

## Monitoring and Analytics

### Add Google Analytics (Optional)

1. **Install package**

   ```bash
   npm install react-ga4
   ```

2. **Initialize in main.jsx**

   ```javascript
   import ReactGA from "react-ga4";

   ReactGA.initialize("YOUR-GA4-ID");
   ```

3. **Track page views**
   ```javascript
   useEffect(() => {
     ReactGA.send({ hitType: "pageview", page: window.location.pathname });
   }, []);
   ```

---

## Custom Domain

Most platforms support custom domains:

1. Purchase domain from registrar (Namecheap, GoDaddy, etc.)
2. Add domain in hosting platform settings
3. Update DNS records as instructed by platform
4. Wait for DNS propagation (24-48 hours)

---

## Continuous Deployment

All recommended platforms support automatic deployments:

- **Automatic**: Push to main branch triggers deployment
- **Preview**: Pull requests create preview deployments
- **Rollback**: Easy rollback to previous deployments

---

## Environment-Specific Configuration

If you need different settings for production:

1. **Create .env files**

   - `.env.development`
   - `.env.production`

2. **Add environment variables**

   ```
   VITE_API_URL=https://fakestoreapi.com
   ```

3. **Access in code**

   ```javascript
   const API_URL = import.meta.env.VITE_API_URL;
   ```

4. **Configure in hosting platform**
   - Add environment variables in platform settings
   - Prefix with `VITE_` for Vite projects

---

## Support

For platform-specific issues:

- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **Netlify**: [docs.netlify.com](https://docs.netlify.com)
- **GitHub Pages**: [pages.github.com](https://pages.github.com)
- **Railway**: [docs.railway.app](https://docs.railway.app)
- **Render**: [render.com/docs](https://render.com/docs)

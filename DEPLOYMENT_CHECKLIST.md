# Deployment Checklist

## ✅ Pre-Deployment Verification

### Testing

- [x] All 22 tests passing locally
- [x] ProductCard component: 8 unit tests ✓
- [x] Navbar component: 7 unit tests ✓
- [x] Cart integration: 7 integration tests ✓
- [x] Tests run in CI mode: `npm run test:run` ✓

### Build

- [ ] Production build successful: `npm run build`
- [ ] Build preview works: `npm run preview`
- [ ] No console errors in production build
- [ ] All assets loading correctly

### Code Quality

- [ ] ESLint passing: `npm run lint`
- [ ] No TypeScript errors
- [ ] No security vulnerabilities: `npm audit`

## 🚀 GitHub Setup

### Repository Creation

- [ ] Create new GitHub repository
- [ ] Initialize git in project: `git init`
- [ ] Add all files: `git add .`
- [ ] Initial commit: `git commit -m "Initial commit with TDD and CI/CD"`
- [ ] Set main branch: `git branch -M main`
- [ ] Add remote: `git remote add origin <url>`
- [ ] Push to GitHub: `git push -u origin main`

### GitHub Actions

- [ ] Verify `.github/workflows/main.yml` exists
- [ ] Workflow file syntax is valid
- [ ] All required scripts in package.json exist

## 🌐 Vercel Setup

### Account & Project Setup

- [ ] Create Vercel account (if not exists)
- [ ] Install Vercel CLI: `npm install -g vercel`
- [ ] Login to Vercel: `vercel login`
- [ ] Link project: `vercel` (follow prompts)
- [ ] Note project created successfully

### Get Vercel Credentials

- [ ] Get VERCEL_TOKEN from https://vercel.com/account/tokens
- [ ] Get VERCEL_ORG_ID from `.vercel/project.json`
- [ ] Get VERCEL_PROJECT_ID from `.vercel/project.json`

### Configure GitHub Secrets

- [ ] Go to GitHub repo → Settings → Secrets and variables → Actions
- [ ] Add secret: VERCEL_TOKEN
- [ ] Add secret: VERCEL_ORG_ID
- [ ] Add secret: VERCEL_PROJECT_ID
- [ ] Verify all three secrets are saved

## 🔥 Firebase Configuration

### Environment Variables

- [ ] Create `.env` file (if not exists)
- [ ] Add all Firebase credentials:
  - [ ] VITE_FIREBASE_API_KEY
  - [ ] VITE_FIREBASE_AUTH_DOMAIN
  - [ ] VITE_FIREBASE_PROJECT_ID
  - [ ] VITE_FIREBASE_STORAGE_BUCKET
  - [ ] VITE_FIREBASE_MESSAGING_SENDER_ID
  - [ ] VITE_FIREBASE_APP_ID

### Vercel Environment Variables

- [ ] Go to Vercel dashboard → Project → Settings → Environment Variables
- [ ] Add all Firebase environment variables
- [ ] Set for Production, Preview, and Development
- [ ] Save changes

## 📝 Documentation Updates

### README.md

- [ ] Update live demo URL with actual Vercel URL
- [ ] Update GitHub repository URL (if different)
- [ ] Verify CI/CD badge URL is correct
- [ ] Check all links work

### Additional Files

- [ ] Review CICD_SETUP.md for accuracy
- [ ] Review TESTING_GUIDE.md for completeness
- [ ] Review PROJECT_IMPLEMENTATION_SUMMARY.md

## 🎯 First Deployment

### Trigger Pipeline

- [ ] Make a small change (e.g., update README)
- [ ] Commit: `git add . && git commit -m "Trigger CI/CD pipeline"`
- [ ] Push to main: `git push origin main`

### Monitor Deployment

- [ ] Go to GitHub → Actions tab
- [ ] Watch workflow run
- [ ] Verify "Build and Test" job passes
- [ ] Verify all 22 tests pass in CI
- [ ] Verify "Deploy" job runs
- [ ] Verify deployment to Vercel succeeds

### Verify Live Site

- [ ] Open Vercel deployment URL
- [ ] Test product listing loads
- [ ] Test adding products to cart
- [ ] Test cart functionality
- [ ] Test navigation between pages
- [ ] Test on mobile device/responsive view
- [ ] Check browser console for errors

## 🔍 Post-Deployment Checks

### Functionality Testing

- [ ] Products load from Firebase
- [ ] Images display correctly
- [ ] Add to cart works
- [ ] Cart count updates in navbar
- [ ] Cart page shows correct items
- [ ] Quantity adjustment works
- [ ] Remove from cart works
- [ ] Checkout clears cart
- [ ] Session persistence works (refresh page)

### Performance

- [ ] Page loads within 3 seconds
- [ ] No excessive network requests
- [ ] Images optimized and loading
- [ ] No console errors or warnings

### SEO & Accessibility

- [ ] Page title is correct
- [ ] Meta descriptions present
- [ ] Images have alt text
- [ ] Links are accessible
- [ ] Keyboard navigation works

## 📊 GitHub Repository Final Touches

### Repository Settings

- [ ] Add repository description
- [ ] Add relevant topics/tags
- [ ] Enable Issues (if desired)
- [ ] Add LICENSE file
- [ ] Add CONTRIBUTING.md (if desired)

### Repository README Badges

- [ ] Add CI/CD status badge
- [ ] Add Vercel deployment badge
- [ ] Add any other relevant badges

### Branch Protection (Optional but Recommended)

- [ ] Go to Settings → Branches
- [ ] Add rule for main branch
- [ ] Require pull request reviews
- [ ] Require status checks (CI tests) to pass
- [ ] Enable "Require branches to be up to date"

## ✅ Final Verification

### Checklist Complete

- [ ] All tests passing (22/22) ✓
- [ ] GitHub repository created and pushed
- [ ] Vercel project created and linked
- [ ] GitHub Secrets configured
- [ ] CI/CD pipeline running successfully
- [ ] Application deployed to Vercel
- [ ] Live URL accessible and functional
- [ ] README updated with live URL
- [ ] Documentation complete

## 🎉 Submission Ready

### For Submission Include:

1. **GitHub Repository URL**: ************\_\_\_************
2. **Live Vercel URL**: ************\_\_\_************
3. **CI/CD Pipeline**: Verify badge shows "passing"
4. **README.md**: Contains link to live application

### What to Submit:

```
GitHub Repository URL with:
- ✅ Complete source code
- ✅ All test files (22 tests)
- ✅ CI/CD workflow configuration
- ✅ README with live deployment link
- ✅ Passing CI/CD pipeline
- ✅ Working Vercel deployment
```

## 📞 Support & Troubleshooting

### If Tests Fail in CI:

1. Check GitHub Actions logs
2. Run tests locally: `npm run test:run`
3. Verify all dependencies in package.json
4. Check Node version compatibility

### If Deployment Fails:

1. Check Vercel deployment logs
2. Verify all environment variables set
3. Check GitHub Secrets are correct
4. Verify build succeeds locally: `npm run build`

### If Live Site Has Issues:

1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify Firebase configuration
4. Test locally with production build: `npm run preview`

## 📚 Additional Resources

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Vercel Deployment Docs](https://vercel.com/docs)
- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)

---

**Once all items are checked, your project is ready for submission! 🚀**

# CI/CD Deployment Guide

## Overview

This project uses GitHub Actions for Continuous Integration and Continuous Deployment (CI/CD) to automatically build, test, and deploy the application to Vercel.

## CI/CD Pipeline Stages

### 1. Build and Test (CI)

The CI pipeline automatically runs on every push to the `main` branch and on pull requests:

- **Checkout Code**: Retrieves the latest code from the repository
- **Setup Node.js**: Configures Node.js environment (v18)
- **Install Dependencies**: Installs all required npm packages
- **Run Linting**: Executes ESLint to check code quality
- **Build Project**: Compiles the application using Vite
- **Run Tests**: Executes all unit and integration tests using Vitest
- **Upload Artifacts**: Stores build output for debugging

### 2. Deploy (CD)

The CD pipeline runs only after successful CI tests on the `main` branch:

- **Checkout Code**: Retrieves the latest code
- **Setup Node.js**: Configures Node.js environment
- **Install Dependencies**: Installs production dependencies
- **Build for Production**: Creates optimized production build
- **Deploy to Vercel**: Deploys the application to Vercel hosting

## Setup Instructions

### Prerequisites

1. A GitHub account with a repository for this project
2. A Vercel account (sign up at https://vercel.com)
3. Node.js 18.x or higher installed locally

### Setting Up Vercel Deployment

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 2: Link Your Project to Vercel

```bash
vercel login
cd "d:\Advanced React E-Commerce Web App"
vercel
```

Follow the prompts to:

- Set up and deploy your project
- Choose your Vercel account/organization
- Link to existing project or create new one
- Confirm the settings

#### Step 3: Get Vercel Credentials

After linking your project, you need three values for GitHub Secrets:

1. **VERCEL_TOKEN**: Get from https://vercel.com/account/tokens
   - Create a new token with the appropriate scope
2. **VERCEL_ORG_ID**: Found in `.vercel/project.json` after running `vercel link`
   ```bash
   cat .vercel/project.json
   ```
3. **VERCEL_PROJECT_ID**: Also found in `.vercel/project.json`

#### Step 4: Add GitHub Secrets

1. Go to your GitHub repository
2. Navigate to Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add the following secrets:
   - `VERCEL_TOKEN`: Your Vercel token
   - `VERCEL_ORG_ID`: Your organization ID
   - `VERCEL_PROJECT_ID`: Your project ID

### Testing the Pipeline

#### Test CI Locally

```bash
# Run tests
npm test

# Run build
npm run build

# Run linting
npm run lint
```

#### Trigger CI/CD Pipeline

1. Make changes to your code
2. Commit and push to the `main` branch:

```bash
git add .
git commit -m "feat: trigger CI/CD pipeline"
git push origin main
```

3. Check the Actions tab in your GitHub repository to monitor the workflow

## Workflow Features

### Automated Testing

- **Unit Tests**: Tests for individual components (ProductCard, Navbar)
- **Integration Tests**: Tests for Cart functionality and user interactions
- **Test Coverage**: Ensures components render correctly and handle state changes

### Deployment Strategy

- **Production Deployment**: Only deploys to Vercel after all tests pass
- **Failed Test Protection**: Prevents deployment if any test fails
- **Branch Protection**: Only deploys from the `main` branch
- **Pull Request Checks**: Runs tests on PRs without deploying

### Build Optimization

- **Cache Dependencies**: Uses npm cache for faster builds
- **Parallel Jobs**: Separates build/test from deployment
- **Artifact Storage**: Saves build output for 7 days

## Monitoring and Debugging

### View Workflow Logs

1. Go to your GitHub repository
2. Click on the "Actions" tab
3. Select a workflow run to view detailed logs

### Common Issues

**Tests Failing in CI**:

- Ensure all dependencies are in `package.json`
- Check that tests pass locally with `npm test`
- Review test logs in GitHub Actions

**Deployment Failing**:

- Verify Vercel secrets are correctly set
- Check Vercel dashboard for deployment logs
- Ensure build succeeds with `npm run build`

**Build Errors**:

- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check for environment-specific issues
- Review build logs in GitHub Actions

## Environment Variables

If your application requires environment variables:

1. Add them to Vercel dashboard (Settings → Environment Variables)
2. For GitHub Actions, add them as GitHub Secrets
3. Reference them in the workflow file using `${{ secrets.VARIABLE_NAME }}`

## Manual Deployment

To manually deploy to Vercel:

```bash
# Deploy to production
vercel --prod

# Deploy preview
vercel
```

## Best Practices

1. **Always run tests locally** before pushing to main
2. **Use feature branches** for development and create PRs to main
3. **Monitor the Actions tab** for workflow status
4. **Keep dependencies updated** to avoid security vulnerabilities
5. **Review Vercel deployment logs** for production issues

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel Documentation](https://vercel.com/docs)
- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)

## Support

If you encounter issues:

1. Check the GitHub Actions logs
2. Review Vercel deployment logs
3. Ensure all secrets are properly configured
4. Verify local tests pass before pushing

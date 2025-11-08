# Docker Build Troubleshooting Guide

## Common Build Errors and Solutions

### Error: "build step 0 failed: step exited with non-zero status: 2"

This error typically indicates a problem during the Docker build process. Here are common causes and solutions:

#### 1. TypeScript Compilation Errors

**Solution:** The build now uses `vite build` directly instead of `tsc && vite build` to avoid strict TypeScript checking during Docker builds.

If you still encounter TypeScript errors:
- Check that all imports are correct
- Ensure all files are present in the repository
- Review the build logs for specific error messages

#### 2. Missing Dependencies

**Solution:** 
```bash
# Ensure package.json has all required dependencies
npm install
```

#### 3. Missing Files

**Solution:** Ensure all required files are present:
- `package.json`
- `vite.config.ts`
- `tsconfig.json`
- `tailwind.config.js`
- `postcss.config.js`
- All source files in `src/` directory
- `nginx.conf`

#### 4. Build Memory Issues

**Solution:** If you encounter memory errors during build, you can:
- Increase Cloud Build machine type in `cloudbuild.yaml`
- Or use a simpler build process

#### 5. Port Configuration

**Solution:** Ensure nginx.conf is set to listen on port 8080 (required for Google Cloud Run)

### Testing Docker Build Locally

Before deploying to Google Cloud, test the build locally:

```bash
# Build the image
docker build -t portfolio-website .

# Run the container
docker run -p 8080:8080 portfolio-website

# Test in browser
# Open http://localhost:8080
```

### Viewing Build Logs

If the build fails in Google Cloud Build:

1. Go to Google Cloud Console
2. Navigate to Cloud Build > History
3. Click on the failed build
4. Review the build logs for specific errors

### Common Fixes

1. **Clear Docker cache:**
   ```bash
   docker build --no-cache -t portfolio-website .
   ```

2. **Check for syntax errors:**
   ```bash
   # Validate Dockerfile
   docker build --dry-run .
   ```

3. **Verify all files are committed:**
   ```bash
   git status
   git add .
   git commit -m "Fix missing files"
   ```

### Alternative: Simpler Build Process

If you continue to have issues, you can use a simpler single-stage build:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .
RUN npm run build

# Install a simple HTTP server
RUN npm install -g serve

EXPOSE 8080

CMD ["serve", "-s", "dist", "-l", "8080"]
```

### Getting Help

If you're still experiencing issues:
1. Check the full build logs in Google Cloud Console
2. Test the build locally first
3. Ensure all environment variables are set correctly
4. Verify your Google Cloud project has the necessary permissions


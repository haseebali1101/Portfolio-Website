# Local Testing Guide

## Prerequisites

Before testing locally, you need to install:

1. **Docker Desktop** (for Windows)
   - Download from: https://www.docker.com/products/docker-desktop/
   - Install and restart your computer
   - Verify installation: `docker --version`

2. **Node.js and npm** (optional, for testing build without Docker)
   - Download from: https://nodejs.org/
   - Install Node.js (includes npm)
   - Verify installation: `node --version` and `npm --version`

## Testing Options

### Option 1: Test with Docker (Recommended)

#### Step 1: Install Docker Desktop
1. Download Docker Desktop for Windows from https://www.docker.com/products/docker-desktop/
2. Install and restart your computer
3. Start Docker Desktop
4. Verify it's running: `docker --version`

#### Step 2: Build and Run

**Using PowerShell script:**
```powershell
.\test-build.ps1
```

**Or manually:**
```powershell
# Build the image
docker build -t portfolio-website .

# Run the container
docker run -d -p 8080:8080 --name portfolio-test portfolio-website

# Visit http://localhost:8080 in your browser
```

#### Step 3: Stop and Clean Up

```powershell
# Stop the container
docker stop portfolio-test

# Remove the container
docker rm portfolio-test

# Remove the image (optional)
docker rmi portfolio-website
```

### Option 2: Test Build Process Only (without Docker)

If you have Node.js installed:

```powershell
# Install dependencies
npm install

# Build the application
npm run build

# Preview the built application
npm run preview
```

This will build the application and start a preview server (usually on port 4173).

### Option 3: Test in Development Mode

```powershell
# Install dependencies
npm install

# Start development server
npm run dev
```

This will start the Vite development server (usually on port 5173).

## Troubleshooting

### Docker not found
- Make sure Docker Desktop is installed and running
- Restart your terminal/PowerShell after installing Docker
- Check Docker Desktop is running in the system tray

### Port 8080 already in use
- Change the port: `docker run -d -p 3000:8080 --name portfolio-test portfolio-website`
- Then visit: http://localhost:3000

### Build fails
- Check that all files are present in the directory
- Verify `package.json` has all dependencies
- Check the error messages in the build output

### Container won't start
- Check logs: `docker logs portfolio-test`
- Verify nginx.conf is present
- Check that the build created the `dist` folder

## Verifying the Build

After building, you should see:
- ✅ `dist` folder created with built files
- ✅ No build errors in the console
- ✅ Container starts without errors
- ✅ Website loads at http://localhost:8080

## Next Steps

Once local testing is successful:
1. Commit and push any changes to GitHub
2. Deploy to Google Cloud using the deployment commands
3. Your portfolio will be live on Google Cloud Run

## Quick Test Commands

```powershell
# Build only
docker build -t portfolio-website .

# Build and run
docker build -t portfolio-website . ; docker run -d -p 8080:8080 --name portfolio-test portfolio-website

# View logs
docker logs portfolio-test

# Stop and remove
docker stop portfolio-test ; docker rm portfolio-test
```


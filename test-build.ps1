# PowerShell script for local Docker build and run

Write-Host "Building Docker image..." -ForegroundColor Green
docker build -t portfolio-website .

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Starting container on port 8080..." -ForegroundColor Green
    docker run -d -p 8080:8080 --name portfolio-test portfolio-website
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Container started successfully!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Portfolio is running at: http://localhost:8080" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "To stop the container, run:" -ForegroundColor Yellow
        Write-Host "  docker stop portfolio-test"
        Write-Host "  docker rm portfolio-test"
        Write-Host ""
        Write-Host "To view logs, run:" -ForegroundColor Yellow
        Write-Host "  docker logs portfolio-test"
    } else {
        Write-Host "❌ Failed to start container" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}


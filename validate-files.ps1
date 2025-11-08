# PowerShell script to validate all required files are present

Write-Host "Validating required files..." -ForegroundColor Green
Write-Host ""

$requiredFiles = @(
    "Dockerfile",
    "nginx.conf",
    "package.json",
    "vite.config.ts",
    "tsconfig.json",
    "tailwind.config.js",
    "postcss.config.js",
    "index.html",
    ".dockerignore"
)

$requiredDirs = @(
    "src",
    "src/components"
)

$missingFiles = @()
$missingDirs = @()

# Check files
foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "✅ $file" -ForegroundColor Green
    } else {
        Write-Host "❌ $file - MISSING" -ForegroundColor Red
        $missingFiles += $file
    }
}

# Check directories
foreach ($dir in $requiredDirs) {
    if (Test-Path $dir) {
        Write-Host "✅ $dir/" -ForegroundColor Green
    } else {
        Write-Host "❌ $dir/ - MISSING" -ForegroundColor Red
        $missingDirs += $dir
    }
}

# Check component files
Write-Host ""
Write-Host "Checking component files..." -ForegroundColor Cyan
$components = @(
    "src/App.tsx",
    "src/main.tsx",
    "src/index.css",
    "src/components/Navbar.tsx",
    "src/components/Hero.tsx",
    "src/components/About.tsx",
    "src/components/Skills.tsx",
    "src/components/Projects.tsx",
    "src/components/Contact.tsx",
    "src/components/Footer.tsx"
)

foreach ($component in $components) {
    if (Test-Path $component) {
        Write-Host "✅ $component" -ForegroundColor Green
    } else {
        Write-Host "❌ $component - MISSING" -ForegroundColor Red
        $missingFiles += $component
    }
}

Write-Host ""
if ($missingFiles.Count -eq 0 -and $missingDirs.Count -eq 0) {
    Write-Host "✅ All required files are present!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Install Docker Desktop: https://www.docker.com/products/docker-desktop/"
    Write-Host "2. Run: .\test-build.ps1"
    Write-Host "3. Or deploy directly to Google Cloud"
    exit 0
} else {
    Write-Host "❌ Missing files found. Please ensure all files are present before building." -ForegroundColor Red
    exit 1
}


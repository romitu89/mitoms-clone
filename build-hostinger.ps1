$ErrorActionPreference = "Stop"

Set-Location $PSScriptRoot

Write-Host "Installing project dependencies..." -ForegroundColor Cyan
npm install

Write-Host "Creating the static Next.js build..." -ForegroundColor Cyan
npm run build

$zipPath = Join-Path $PSScriptRoot "MITOMS-PublicHTML-Build.zip"
if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
}

Write-Host "Creating Hostinger upload ZIP..." -ForegroundColor Cyan
$items = Get-ChildItem -Force (Join-Path $PSScriptRoot "out")
Compress-Archive -Path $items.FullName -DestinationPath $zipPath -Force

Write-Host "" 
Write-Host "Build completed successfully." -ForegroundColor Green
Write-Host "Upload and extract this file directly inside public_html:" -ForegroundColor Green
Write-Host $zipPath -ForegroundColor Yellow

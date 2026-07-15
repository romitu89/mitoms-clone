$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

Set-Location $PSScriptRoot

function Invoke-NpmCommand {
    param(
        [Parameter(Mandatory = $true)]
        [string[]]$Arguments,
        [Parameter(Mandatory = $true)]
        [string]$FailureMessage
    )

    & npm @Arguments
    if ($LASTEXITCODE -ne 0) {
        throw "$FailureMessage (exit code: $LASTEXITCODE)"
    }
}

$zipPath = Join-Path $PSScriptRoot "MITOMS-PublicHTML-Build.zip"
if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
}

Write-Host "Installing project dependencies..." -ForegroundColor Cyan
Invoke-NpmCommand -Arguments @("ci", "--no-audit", "--no-fund") -FailureMessage "Dependency installation failed"

Write-Host "Creating a clean static Next.js build..." -ForegroundColor Cyan
Invoke-NpmCommand -Arguments @("run", "build:hostinger") -FailureMessage "Next.js build failed"

$outPath = Join-Path $PSScriptRoot "out"
if (-not (Test-Path $outPath)) {
    throw "Build command finished, but the out folder was not created."
}

$indexPath = Join-Path $outPath "index.html"
if (-not (Test-Path $indexPath)) {
    throw "Build output is incomplete: out/index.html was not created."
}

Write-Host "Creating Hostinger upload ZIP..." -ForegroundColor Cyan
$items = @(Get-ChildItem -Force $outPath)
if ($items.Count -eq 0) {
    throw "The out folder is empty, so the upload ZIP cannot be created."
}

Compress-Archive -Path $items.FullName -DestinationPath $zipPath -Force

Write-Host ""
Write-Host "Build completed successfully." -ForegroundColor Green
Write-Host "Upload and extract this file directly inside public_html:" -ForegroundColor Green
Write-Host $zipPath -ForegroundColor Yellow

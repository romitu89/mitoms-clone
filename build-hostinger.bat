@echo off
setlocal
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0build-hostinger.ps1"
if errorlevel 1 (
  echo.
  echo Build failed. Review the error shown above.
  pause
  exit /b 1
)
echo.
pause

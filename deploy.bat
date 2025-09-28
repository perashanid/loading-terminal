@echo off
REM Build the project
npm ci
npm run build

REM Copy redirects file for SPA routing
copy _redirects dist\_redirects

echo Build completed successfully!
echo Deploy the 'dist' folder to your hosting service.
#!/bin/bash
# Build the project
npm ci
npm run build

# Copy redirects file for SPA routing
cp _redirects dist/_redirects

echo "Build completed successfully!"
echo "Deploy the 'dist' folder to your hosting service."
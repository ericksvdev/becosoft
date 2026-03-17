#!/usr/bin/env bash
set -e

echo "=== BecoSoft.FrontendTest Setup ==="
echo ""

echo "[1/4] Restoring .NET local tools..."
dotnet tool restore

echo "[2/4] Restoring NuGet packages..."
dotnet restore

echo "[3/4] Restoring front-end libraries (libman)..."
(cd src/BecoSoft.FrontendTest.Web && dotnet libman restore)

echo "[4/4] Building solution..."
dotnet build --no-restore

echo ""
echo "=== Setup complete! ==="
echo "Run the application with:"
echo "  dotnet run --project src/BecoSoft.FrontendTest.Web"

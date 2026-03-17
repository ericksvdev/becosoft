@echo off
echo === BecoSoft.FrontendTest Setup ===
echo.

echo [1/4] Restoring .NET local tools...
dotnet tool restore || goto :error

echo [2/4] Restoring NuGet packages...
dotnet restore || goto :error

echo [3/4] Restoring front-end libraries (libman)...
pushd src\BecoSoft.FrontendTest.Web
dotnet libman restore || (popd && goto :error)
popd

echo [4/4] Building solution...
dotnet build --no-restore || goto :error

echo.
echo === Setup complete! ===
echo Run the application with:
echo   dotnet run --project src\BecoSoft.FrontendTest.Web
goto :eof

:error
echo.
echo === Setup failed! ===
exit /b 1

@echo off
cd /d "%~dp0"
set "NODE_ANGULAR=%LOCALAPPDATA%\Author Software\nvm\installs\v20.11.1"
if exist "%NODE_ANGULAR%\node.exe" set "PATH=%NODE_ANGULAR%;%PATH%"
node -v
if errorlevel 1 (
 echo No se pudo ejecutar Node.
 pause
 exit /b 1
)
if not exist node_modules (
 call npm.cmd ci
 if errorlevel 1 (
  pause
  exit /b 1
 )
)
call npm.cmd start -- --port 4200
pause

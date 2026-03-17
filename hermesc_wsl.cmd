@echo off
setlocal EnableDelayedExpansion

REM Get WSL path for current directory
for /f "usebackq delims=" %%p in (`wsl wslpath "%CD%"`) do set "WSLPWD=%%p"

REM Build hermesc WSL path
set "HERMESC=!WSLPWD!/node_modules/hermes-compiler/hermesc/linux64-bin/hermesc"

REM Process all arguments - convert backslashes to forward slashes
set "WSARGS="
:parse
if "%~1"=="" goto execute
set "ARG=%~1"
set "ARG=!ARG:\=/!"
if "!WSARGS!"=="" (
    set "WSARGS=!ARG!"
) else (
    set "WSARGS=!WSARGS! !ARG!"
)
shift
goto parse

:execute
wsl -- !HERMESC! !WSARGS!
exit /b %ERRORLEVEL%

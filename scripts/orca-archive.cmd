@echo off
rem Orca archive hook helper. Called from orca.yaml (scripts.archive) before a
rem worktree is archived/deleted. Backs up gitignored local state that would
rem otherwise be lost with the worktree directory.
rem - Destination: <primary checkout>/.orca-archive/<workspace name>/
rem - Env provided by Orca: ORCA_ROOT_PATH, ORCA_WORKTREE_PATH, ORCA_WORKSPACE_NAME
rem - Keep this file ASCII-only: cmd.exe reads batch files in the OEM codepage.

if not exist "%ORCA_ROOT_PATH%\.orca-archive\%ORCA_WORKSPACE_NAME%" mkdir "%ORCA_ROOT_PATH%\.orca-archive\%ORCA_WORKSPACE_NAME%"
if exist sav xcopy /Y /E /I "sav" "%ORCA_ROOT_PATH%\.orca-archive\%ORCA_WORKSPACE_NAME%\sav" >nul
if exist ere.config.json copy /Y ere.config.json "%ORCA_ROOT_PATH%\.orca-archive\%ORCA_WORKSPACE_NAME%\" >nul
git branch --show-current > "%ORCA_ROOT_PATH%\.orca-archive\%ORCA_WORKSPACE_NAME%\branch.txt"
git status --porcelain

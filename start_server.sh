#!/bin/zsh

echo "[Info] Starting game server"
npx http-server -p 8000 || echo "[Error] Failed to start server with 'npx'. Do you have node installed?"
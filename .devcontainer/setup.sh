#!/bin/bash

echo "📦 Installeren lokale dependencies..."
npm install

npm i -g orval

echo "🌐 Installeren Claude Code SDK globaal..."
npm install -g @anthropic-ai/claude-code

echo "✅ Setup klaar."


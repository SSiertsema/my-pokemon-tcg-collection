#!/bin/bash

echo "📦 Installeren lokale dependencies..."
npm install

npm i -g orval

echo "🌐 Installeren Claude Code SDK globaal..."
npm install -g @anthropic-ai/claude-code

echo "🔌 Installeren Claude Code plugins..."
git clone https://github.com/SSiertsema/claude-code-plugins.git /tmp/claude-plugins

# Copy plugin directories to project's .claude/commands directory
mkdir -p .claude/commands
cp -r /tmp/claude-plugins/*/ .claude/commands/ 2>/dev/null || true

# Clean up temp directory
rm -rf /tmp/claude-plugins

echo "✅ Setup klaar."


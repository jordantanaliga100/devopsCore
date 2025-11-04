#!/bin/bash

# Interactive Git add, commit, push script (repo-only)
echo "📝 Git Interactive Script (Repo-Only)"

# Show current branch
CURRENT_BRANCH=$(git branch --show-current)
echo "Current branch: $CURRENT_BRANCH"

# Ask for branch to push (default current branch)
read -p "Enter branch to push (default: $CURRENT_BRANCH): " BRANCH
BRANCH=${BRANCH:-$CURRENT_BRANCH}

# Ask for commit message
read -p "Enter commit message: " COMMIT_MSG

if [ -z "$COMMIT_MSG" ]; then
  echo "❌ Commit message cannot be empty!"
  exit 1
fi

# Add only tracked files
git add -u

# Commit changes
git commit -m "$COMMIT_MSG"

# Push to selected branch
git push origin "$BRANCH"

echo "✅ Changes pushed to branch '$BRANCH' successfully!"
echo "☑️ Go to repo and make a PR"


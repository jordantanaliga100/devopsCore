# #!/bin/bash

# echo "Starting interactive GIT 👁️‍🗨️..."

# # add all changes...
# git add .
# # ask me a commit message
# read -p "✏️ Enter a commit message: " msg
# # validate message 
# if [ -z "$msg" ]; then 
#   echo "🎌 Commit message cannot be empty!"
#   exit 1 
# fi 

# git commit -m "$msg"

# echo "✅ Commit Complete"

# echo "✅ Pushing changes to remote repo"
# git push origin "$(git branch --show-current)"

# echo "💁 : Done !"


#!/bin/bash

# =============== COLORS ===============
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
RED="\033[0;31m"
BLUE="\033[1;34m"
NC="\033[0m" # No color

echo -e "${BLUE}🚀 Starting Interactive Git Tool...${NC}"

# =============== CHECK FOR CHANGES ===============
if git diff --quiet && git diff --cached --quiet; then
  echo -e "${YELLOW}⚠️ No changes to commit!${NC}"
  exit 0
fi

# Add modified files
git add .

echo -e "\n📝 Choose a commit type:"
echo "  1) feat     - new feature"
echo "  2) fix      - bug fix"
echo "  3) refactor - code improvement"
echo "  4) chore    - maintenance"
echo "  5) docs     - documentation"
echo "  6) style    - formatting"
echo "  7) test     - tests only"

read -p "👉 Enter type number: " type_choice

case $type_choice in
  1) prefix="feat";;
  2) prefix="fix";;
  3) prefix="refactor";;
  4) prefix="chore";;
  5) prefix="docs";;
  6) prefix="style";;
  7) prefix="test";;
  *) echo -e "${RED}❌ Invalid choice!${NC}"; exit 1;;
esac

read -p "✏️ Enter commit message: " msg

if [ -z "$msg" ]; then
  echo -e "${RED}❌ Commit message cannot be empty!${NC}"
  exit 1
fi

# Full commit message
commit="$prefix: $msg"

git commit -m "$commit"

echo -e "${GREEN}✅ Commit created: ${NC}$commit"


# =============== SPINNER FUNCTION ===============
spinner() {
  local pid=$1
  local delay=0.1
  local spin='|/-\'
  while ps -p $pid > /dev/null; do
    for i in $(seq 0 3); do
      echo -ne "   ⏳ Pushing... ${spin:$i:1} \r"
      sleep $delay
    done
  done
  echo -ne "   ✅ Push complete!     \r"
}

# =============== PUSH ===============
echo -e "\n🚀 Pushing to remote..."

branch="$(git branch --show-current)"

# Run push in background
git push origin "$branch" &
push_pid=$!

spinner $push_pid

wait $push_pid

echo -e "\n${GREEN}🎉 All done!${NC}"

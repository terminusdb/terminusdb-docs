#!/bin/bash

# This script:
#
# 1. runs the script in `jsonToMDConverter` to build reference schema Markdown
#    files from the JSON sources
#
# 2. runs `ronn` to build a Markdown file from the command-line man page

set -e

BRANCH="$1"

[[ "$BRANCH" ]] || (echo "Missing argument for branch"; exit 1)

# Use 'main' if the branch is not a version branch (e.g. 'v10.1') or 'main'.
if [[ $(echo "$BRANCH" | grep -vE "^main|^v") ]]; then
  BRANCH="main"
fi

TOP_DIR="$(git rev-parse --show-toplevel)"
JSON_CONVERTER_DIR="$TOP_DIR/.github/jsonToMDConverter"
REFERENCE_DIR="$TOP_DIR/md/reference"
TERMINUSDB_DIR="$TOP_DIR/terminusdb"

echo "Checking out 'terminusdb/terminusdb' at branch '$BRANCH'..."

# Check out the terminusdb repository
git clone -b "$BRANCH" --depth 1 \
  https://github.com/terminusdb/terminusdb.git \
  "$TERMINUSDB_DIR"

echo "Building reference schema documentation..."

(cd "$JSON_CONVERTER_DIR"; npm install; npm test -- "$TERMINUSDB_DIR/" "$REFERENCE_DIR/")

echo "Installing ronn (if needed)..."

command -v ronn > /dev/null 2>&1 || sudo apt install ronn

echo "Building CLI documentation..."

cd "$TERMINUSDB_DIR"
PATH="$TERMINUSDB_DIR:$PATH" make all
cp "$TERMINUSDB_DIR/docs/terminusdb.1.ronn" "$REFERENCE_DIR/CLI.md"

echo "Removing untracked files..."

cd "$TOP_DIR"
git clean -d -f -f

echo "Done."

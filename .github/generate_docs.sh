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
REFERENCE_DIR="$TOP_DIR/md/reference"
TERMINUSDB_DIR="$TOP_DIR/terminusdb"

echo "Checking out 'terminusdb/terminusdb' at branch '$BRANCH'..."

# Check out the terminusdb repository
git clone -b "$BRANCH" --depth 1 \
  https://github.com/terminusdb/terminusdb.git \
  "$TERMINUSDB_DIR"

echo "Building reference schema documentation..."

SCHEMA_SRC_DIR="$TERMINUSDB_DIR/src/terminus-schema"
SCHEMA_DST_DIR="$REFERENCE_DIR"

cd "$TOP_DIR/.github/jsonToMDConverter"
npm install
npm test -- "$SCHEMA_SRC_DIR/woql.json"          "$SCHEMA_DST_DIR/reference-woql-schema.md"
npm test -- "$SCHEMA_SRC_DIR/ref.json"           "$SCHEMA_DST_DIR/reference-ref-schema.md"
npm test -- "$SCHEMA_SRC_DIR/repository.json"    "$SCHEMA_DST_DIR/reference-repository-schema.md"
npm test -- "$SCHEMA_SRC_DIR/system_schema.json" "$SCHEMA_DST_DIR/reference-system-schema.md"

echo "Installing ronn (if needed)..."

command -v ronn > /dev/null 2>&1 || sudo apt install ronn

echo "Building CLI documentation..."

cd "$TERMINUSDB_DIR"
PATH="$TERMINUSDB_DIR:$PATH" make all
cp "$TERMINUSDB_DIR/docs/terminusdb.1.ronn" "$REFERENCE_DIR/reference-cli.md"

echo "Removing untracked files..."

cd "$TOP_DIR"
git clean -d -f -f

echo "Done."

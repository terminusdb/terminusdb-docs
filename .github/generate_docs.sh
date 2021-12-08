#!/bin/bash

# This script:
#
# 1. runs the script in `jsonToMDConverter` to build reference schema Markdown
#    files from the JSON sources
#
# 2. generates a CLI reference Markdown file from the template

set -e

BRANCH="$1"

[[ "$BRANCH" ]] || (echo -e "\033[0;34mMissing argument for branch\033[0m"; exit 1)

# Use 'main' if the branch is not a version branch (e.g. 'v10.1') or 'main'.
if [[ $(echo "$BRANCH" | grep -vE "^main|^v") ]]; then
  BRANCH="main"
fi

TOP_DIR="$(git rev-parse --show-toplevel)"
REFERENCE_DIR="$TOP_DIR/md/reference"
TERMINUSDB_DIR="$TOP_DIR/terminusdb"

echo -e "\033[0;34mChecking out 'terminusdb/terminusdb' at branch '$BRANCH'...\033[0m"

# Check out the terminusdb repository
git clone -b "$BRANCH" --depth 1 \
  https://github.com/terminusdb/terminusdb.git \
  "$TERMINUSDB_DIR"

echo -e "\033[0;34mBuilding reference schema documentation...\033[0m"

SCHEMA_SRC_DIR="$TERMINUSDB_DIR/src/terminus-schema"

cd "$TOP_DIR/.github/jsonToMDConverter"
npm install
npm test -- "$SCHEMA_SRC_DIR/woql.json"          "$REFERENCE_DIR/reference-woql-schema.md"
npm test -- "$SCHEMA_SRC_DIR/ref.json"           "$REFERENCE_DIR/reference-ref-schema.md"
npm test -- "$SCHEMA_SRC_DIR/repository.json"    "$REFERENCE_DIR/reference-repository-schema.md"
npm test -- "$SCHEMA_SRC_DIR/system_schema.json" "$REFERENCE_DIR/reference-system-schema.md"

echo -e "\033[0;34mBuilding CLI documentation...\033[0m"

cd "$TERMINUSDB_DIR"
docker build . --file Dockerfile --tag terminusdb:local
export HELP=$(docker run terminusdb:local /app/terminusdb/terminusdb help -m)
envsubst < "./docs/terminusdb.1.ronn.template" > "$REFERENCE_DIR/reference-cli.md"

echo -e "\033[0;34mRemoving untracked files...\033[0m"

cd "$TOP_DIR"
git clean -d -f -f

date
echo -e "\033[0;34mI generated these files:\033[0m"
ls -l \
  "$REFERENCE_DIR/reference-cli.md" \
  "$REFERENCE_DIR/reference-ref-schema.md" \
  "$REFERENCE_DIR/reference-repository-schema.md" \
  "$REFERENCE_DIR/reference-system-schema.md" \
  "$REFERENCE_DIR/reference-woql-schema.md"

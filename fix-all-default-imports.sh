#!/bin/bash

echo "=== Fixing Remaining Default Import Issues ==="

cd packages/sugar || exit 1

# Fix default imports from crypto
echo "1. Fixing crypto default imports..."
find src -name "*.ts" -exec sed -i '' 's|import \([a-zA-Z_][a-zA-Z0-9_]*\) from '\''@blackbyte/sugar/crypto'\'';|import { \1 } from '\''@blackbyte/sugar/crypto'\'';|g' {} \;

# Fix default imports from is  
echo "2. Fixing is default imports..."
find src -name "*.ts" -exec sed -i '' 's|import \([a-zA-Z_][a-zA-Z0-9_]*\) from '\''@blackbyte/sugar/is'\'';|import { \1 } from '\''@blackbyte/sugar/is'\'';|g' {} \;

# Fix default imports from convert
echo "3. Fixing convert default imports..."
find src -name "*.ts" -exec sed -i '' 's|import \([a-zA-Z_][a-zA-Z0-9_]*\) from '\''@blackbyte/sugar/convert'\'';|import { \1 } from '\''@blackbyte/sugar/convert'\'';|g' {} \;

# Fix default imports from html
echo "4. Fixing html default imports..."
find src -name "*.ts" -exec sed -i '' 's|import \([a-zA-Z_][a-zA-Z0-9_]*\) from '\''@blackbyte/sugar/html'\'';|import { \1 } from '\''@blackbyte/sugar/html'\'';|g' {} \;

# Fix default imports from object
echo "5. Fixing object default imports..."  
find src -name "*.ts" -exec sed -i '' 's|import \([a-zA-Z_][a-zA-Z0-9_]*\) from '\''@blackbyte/sugar/object'\'';|import { \1 } from '\''@blackbyte/sugar/object'\'';|g' {} \;

echo "6. Running TypeScript compilation to check progress..."
npx tsc --noEmit 2>&1 | tee build_output.txt | wc -l
#!/bin/bash

echo "=== Fixing Remaining TypeScript Import Path Issues ==="

cd packages/sugar || exit 1

# Fix same-level imports that should be sibling imports
echo "1. Fixing same-level imports (./func/func.js → ../func/func.js)..."
find src -name "*.ts" -type f -exec sed -i '' 's|from '\''./\([^/]*\)/\1\.js'\''|from '\''../\1/\1.js'\''|g' {} \;

# Fix cross-directory imports that use incorrect paths
echo "2. Fixing specific cross-directory path issues..."

# Fix uniqid imports
find src -name "*.ts" -type f -exec sed -i '' 's|from '\''../../../../string/uniqid/uniqid\.js'\''|from '\''@blackbyte/sugar/string'\''|g' {} \;

# Fix references to non-existent when/when.js - replace with @blackbyte/sugar/dom
find src -name "*.ts" -type f -exec sed -i '' 's|from '\''../../when/when/when\.js'\''|from '\''@blackbyte/sugar/dom'\''|g' {} \;

# Fix css parsing imports
find src -name "*.ts" -type f -exec sed -i '' 's|from '\''../../../shared/css/parse/parseKeyframeKey\.js'\''|from '\''@blackbyte/sugar/css'\''|g' {} \;
find src -name "*.ts" -type f -exec sed -i '' 's|from '\''../../../shared/css/rule/removeVendorPrefix\.js'\''|from '\''@blackbyte/sugar/css'\''|g' {} \;

# Fix complex relative paths to use @blackbyte/sugar absolute imports
echo "3. Converting complex relative paths to absolute imports..."

# Fix paths that go up multiple directories
find src -name "*.ts" -type f -exec sed -i '' 's|from '\''../../../\([^/]*\)/\([^/]*\)/\2\.js'\''|from '\''@blackbyte/sugar/\1'\''|g' {} \;
find src -name "*.ts" -type f -exec sed -i '' 's|from '\''../../../../\([^/]*\)/\([^/]*\)/\2\.js'\''|from '\''@blackbyte/sugar/\1'\''|g' {} \;

# Fix any remaining relative imports that cross category boundaries
find src -name "*.ts" -type f -exec sed -i '' 's|from '\''\.\./\.\./\([^/]*\)/\([^/]*\)/\2\.js'\''|from '\''@blackbyte/sugar/\1'\''|g' {} \;

echo "4. Running TypeScript compilation to check for errors..."
npx tsc --noEmit > build_output.txt 2>&1

echo "Script completed. Check build_output.txt for remaining errors."
echo "Error count:"
cat build_output.txt | wc -l
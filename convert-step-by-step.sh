#!/bin/bash

# Step 1: Fix _exports.ts files to use correct subdirectory structure
# Step 2: Convert cross-category imports to @blackbyte/sugar named imports

set -e

SUGAR_ROOT="src"
LOG_FILE="import-conversion-step-by-step.log"

echo "🚀 Starting step-by-step import modernization for @blackbyte/sugar..."
echo "$(date): Starting import conversion" > "$LOG_FILE"

# STEP 1: Fix _exports.ts files first so TypeScript can compile
echo "📁 Step 1: Fixing _exports.ts files for subdirectory structure..."

find "$SUGAR_ROOT" -name "_exports.ts" -exec sed -i '' \
  -e "s|from '\./\([^/]*\)\.js'|from './\1/\1.js'|g" \
  {} \;

echo "Step 1 complete: Updated _exports.ts files" >> "$LOG_FILE"

echo "🔍 Testing TypeScript compilation after _exports.ts fixes..."
if npm run build > /dev/null 2>&1; then
  echo "✅ TypeScript compilation successful after _exports.ts fixes!"
  echo "$(date): TypeScript compilation successful after _exports.ts fixes" >> "$LOG_FILE"
else
  echo "❌ TypeScript compilation still failing. Continuing with import conversion..."
  echo "$(date): TypeScript compilation still failing after _exports.ts fixes" >> "$LOG_FILE"
fi

# STEP 2: Convert cross-platform re-export statements to use named imports
echo "🔄 Step 2: Converting cross-platform re-export statements to named imports..."

# js/is/_exports.ts - change from export * to individual named exports
if [ -f "$SUGAR_ROOT/js/is/_exports.ts" ]; then
  # Note: We'll convert this to named exports from @blackbyte/sugar/is
  sed -i '' "s|export \* from '\.\./\.\./shared/is/_exports\.js';|export * from '@blackbyte/sugar/is';|g" "$SUGAR_ROOT/js/is/_exports.ts"
fi

echo "Step 2 complete: Converted re-export statements" >> "$LOG_FILE"

# STEP 3: Convert cross-category imports to named imports from @blackbyte/sugar
echo "🎯 Step 3: Converting cross-category imports to @blackbyte/sugar named imports..."

# Function to convert import statements to named imports
convert_to_named_import() {
  local file="$1"
  local original_import="$2"
  local package_name="$3"
  local function_name="$4"
  
  # Convert: import functionName from 'path' -> import { functionName } from '@blackbyte/sugar/package'
  sed -i '' "s|import ${function_name} from '${original_import}';|import { ${function_name} } from '@blackbyte/sugar/${package_name}';|g" "$file"
}

# Convert specific patterns we know about
find "$SUGAR_ROOT" -name "*.ts" ! -name "_exports.ts" -exec sed -i '' \
  -e "s|import \([a-zA-Z][a-zA-Z0-9]*\) from '\.\./\.\./is/[^']*\.js';|import { \1 } from '@blackbyte/sugar/is';|g" \
  -e "s|import \([a-zA-Z][a-zA-Z0-9]*\) from '\.\./\.\./string/[^']*\.js';|import { \1 } from '@blackbyte/sugar/string';|g" \
  -e "s|import \([a-zA-Z][a-zA-Z0-9]*\) from '\.\./\.\./\.\./shared/string/[^']*\.js';|import { \1 } from '@blackbyte/sugar/string';|g" \
  -e "s|import \([a-zA-Z][a-zA-Z0-9]*\) from '\.\./\.\./\.\./shared/crypto/[^']*\.js';|import { \1 } from '@blackbyte/sugar/crypto';|g" \
  -e "s|import \([a-zA-Z][a-zA-Z0-9]*\) from '\.\./\.\./\.\./shared/math/[^']*\.js';|import { \1 } from '@blackbyte/sugar/math';|g" \
  -e "s|import \([a-zA-Z][a-zA-Z0-9]*\) from '\.\./\.\./\.\./shared/datetime/[^']*\.js';|import { \1 } from '@blackbyte/sugar/datetime';|g" \
  -e "s|import \([a-zA-Z][a-zA-Z0-9]*\) from '\.\./\.\./\.\./shared/html/[^']*\.js';|import { \1 } from '@blackbyte/sugar/html';|g" \
  -e "s|import \([a-zA-Z][a-zA-Z0-9]*\) from '\.\./\.\./shared/string/[^']*\.js';|import { \1 } from '@blackbyte/sugar/string';|g" \
  -e "s|import \([a-zA-Z][a-zA-Z0-9]*\) from '\.\./package/[^']*\.js';|import { \1 } from '@blackbyte/sugar/package';|g" \
  -e "s|import \([a-zA-Z][a-zA-Z0-9]*\) from '\.\./fs/[^']*\.js';|import { \1 } from '@blackbyte/sugar/fs';|g" \
  {} \;

echo "Step 3 complete: Converted cross-category imports to named imports" >> "$LOG_FILE"

echo "✅ Import modernization steps completed!"
echo "$(date): Import conversion steps completed" >> "$LOG_FILE"

# Final validation
echo "🔍 Running final TypeScript compilation check..."
if npm run build; then
  echo "✅ TypeScript compilation successful!"
  echo "$(date): Final TypeScript compilation successful" >> "$LOG_FILE"
else
  echo "❌ TypeScript compilation still has issues. Manual fixes may be needed."
  echo "$(date): Final TypeScript compilation failed" >> "$LOG_FILE"
fi
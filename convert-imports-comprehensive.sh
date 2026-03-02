#!/bin/bash

# Comprehensive Import Modernization Script for @blackbyte/sugar
# Converts all relative imports to absolute @blackbyte/sugar default imports

set -e

SUGAR_ROOT="src"
LOG_FILE="import-conversion.log"

echo "🚀 Starting comprehensive import modernization for @blackbyte/sugar..."
echo "$(date): Starting import conversion" > "$LOG_FILE"

# Phase 1: Fix _exports.ts files to use correct subdirectory paths
echo "📁 Phase 1: Fixing _exports.ts files for subdirectory structure..."

find "$SUGAR_ROOT" -name "_exports.ts" -exec sed -i '' \
  -e "s|from './\([^/]*\)\.js'|from './\1/\1.js'|g" \
  {} \;

echo "Phase 1 complete: Updated _exports.ts files" >> "$LOG_FILE"

# Phase 2: Fix missing .js extensions in imports (mainly test files)
echo "🔧 Phase 2: Fixing missing .js extensions..."

find "$SUGAR_ROOT" -name "*.ts" -exec sed -i '' \
  -e "s|from '\.\./\([^']*\)'$|from '../\1.js'|g" \
  -e "s|from '\.\./\([^']*\)\.ts'|from '../\1.js'|g" \
  {} \;

echo "Phase 2 complete: Fixed missing extensions" >> "$LOG_FILE"

# Phase 3: Convert cross-platform re-export statements  
echo "🔄 Phase 3: Converting cross-platform re-export statements..."

# js/is/_exports.ts
if [ -f "$SUGAR_ROOT/js/is/_exports.ts" ]; then
  sed -i '' "s|export \* from '\.\./\.\./shared/is/_exports\.js'|export * from '@blackbyte/sugar/is'|g" "$SUGAR_ROOT/js/is/_exports.ts"
fi

# node/console/_exports.ts  
if [ -f "$SUGAR_ROOT/node/console/_exports.ts" ]; then
  sed -i '' "s|export \* from '\.\./\.\./shared/console/_exports\.js'|export * from '@blackbyte/sugar/console'|g" "$SUGAR_ROOT/node/console/_exports.ts"
fi

# js/console/_exports.ts
if [ -f "$SUGAR_ROOT/js/console/_exports.ts" ]; then
  sed -i '' "s|export \* from '\.\./\.\./shared/console/_exports\.js'|export * from '@blackbyte/sugar/console'|g" "$SUGAR_ROOT/js/console/_exports.ts"
fi

# node/string/_exports.ts
if [ -f "$SUGAR_ROOT/node/string/_exports.ts" ]; then
  sed -i '' "s|export \* from '\.\./\.\./shared/string/_exports\.js'|export * from '@blackbyte/sugar/string'|g" "$SUGAR_ROOT/node/string/_exports.ts"
fi

# node/type/_exports.ts
if [ -f "$SUGAR_ROOT/node/type/_exports.ts" ]; then
  sed -i '' "s|export \* from '\.\./\.\./shared/type/_exports\.js'|export * from '@blackbyte/sugar/type'|g" "$SUGAR_ROOT/node/type/_exports.ts"
fi

# js/crypto/_exports.ts
if [ -f "$SUGAR_ROOT/js/crypto/_exports.ts" ]; then
  sed -i '' "s|export \* from '\.\./\.\./shared/crypto/_exports\.js'|export * from '@blackbyte/sugar/crypto'|g" "$SUGAR_ROOT/js/crypto/_exports.ts"
fi

# node/crypto/_exports.ts
if [ -f "$SUGAR_ROOT/node/crypto/_exports.ts" ]; then
  sed -i '' "s|export \* from '\.\./\.\./shared/crypto/_exports\.js'|export * from '@blackbyte/sugar/crypto'|g" "$SUGAR_ROOT/node/crypto/_exports.ts"
fi

echo "Phase 3 complete: Converted re-export statements" >> "$LOG_FILE"

# Phase 4: Convert cross-category imports to absolute @blackbyte/sugar imports
echo "🎯 Phase 4: Converting cross-category imports to absolute @blackbyte/sugar imports..."

# Convert various patterns to @blackbyte/sugar imports using default import style
find "$SUGAR_ROOT" -name "*.ts" ! -name "_exports.ts" -exec sed -i '' \
  -e "s|import \([^{]*\) from '\.\./\.\./is/\([^/]*\)\.js'|import \1from '@blackbyte/sugar/is'|g" \
  -e "s|import \([^{]*\) from '\.\./\.\./string/\([^/]*\)\.js'|import \1from '@blackbyte/sugar/string'|g" \
  -e "s|import \([^{]*\) from '\.\./\.\./\.\./shared/string/\([^/]*\)\.js'|import \1from '@blackbyte/sugar/string'|g" \
  -e "s|import \([^{]*\) from '\.\./\.\./\.\./shared/crypto/\([^/]*\)\.js'|import \1from '@blackbyte/sugar/crypto'|g" \
  -e "s|import \([^{]*\) from '\.\./\.\./\.\./shared/math/\([^/]*\)\.js'|import \1from '@blackbyte/sugar/math'|g" \
  -e "s|import \([^{]*\) from '\.\./\.\./\.\./shared/datetime/\([^/]*\)\.js'|import \1from '@blackbyte/sugar/datetime'|g" \
  -e "s|import \([^{]*\) from '\.\./\.\./\.\./shared/array/\([^/]*\)\.js'|import \1from '@blackbyte/sugar/array'|g" \
  -e "s|import \([^{]*\) from '\.\./\.\./\.\./shared/object/\([^/]*\)\.js'|import \1from '@blackbyte/sugar/object'|g" \
  -e "s|import \([^{]*\) from '\.\./\.\./\.\./shared/is/\([^/]*\)\.js'|import \1from '@blackbyte/sugar/is'|g" \
  -e "s|import \([^{]*\) from '\.\./\.\./\.\./shared/html/\([^/]*\)\.js'|import \1from '@blackbyte/sugar/html'|g" \
  -e "s|import \([^{]*\) from '\.\./\.\./\.\./shared/css/\([^/]*\)\.js'|import \1from '@blackbyte/sugar/css'|g" \
  -e "s|import \([^{]*\) from '\.\./\.\./\.\./shared/convert/\([^/]*\)\.js'|import \1from '@blackbyte/sugar/convert'|g" \
  -e "s|import \([^{]*\) from '\.\./\.\./\.\./shared/easing/\([^/]*\)\.js'|import \1from '@blackbyte/sugar/easing'|g" \
  -e "s|import \([^{]*\) from '\.\./\.\./\.\./shared/extension/\([^/]*\)\.js'|import \1from '@blackbyte/sugar/extension'|g" \
  {} \;

# Convert 2-level paths
find "$SUGAR_ROOT" -name "*.ts" ! -name "_exports.ts" -exec sed -i '' \
  -e "s|import \([^{]*\) from '\.\./\.\./shared/string/\([^/]*\)\.js'|import \1from '@blackbyte/sugar/string'|g" \
  -e "s|import \([^{]*\) from '\.\./\.\./shared/crypto/\([^/]*\)\.js'|import \1from '@blackbyte/sugar/crypto'|g" \
  -e "s|import \([^{]*\) from '\.\./\.\./shared/math/\([^/]*\)\.js'|import \1from '@blackbyte/sugar/math'|g" \
  -e "s|import \([^{]*\) from '\.\./\.\./shared/datetime/\([^/]*\)\.js'|import \1from '@blackbyte/sugar/datetime'|g" \
  -e "s|import \([^{]*\) from '\.\./\.\./shared/array/\([^/]*\)\.js'|import \1from '@blackbyte/sugar/array'|g" \
  -e "s|import \([^{]*\) from '\.\./\.\./shared/object/\([^/]*\)\.js'|import \1from '@blackbyte/sugar/object'|g" \
  -e "s|import \([^{]*\) from '\.\./\.\./shared/is/\([^/]*\)\.js'|import \1from '@blackbyte/sugar/is'|g" \
  -e "s|import \([^{]*\) from '\.\./\.\./shared/html/\([^/]*\)\.js'|import \1from '@blackbyte/sugar/html'|g" \
  -e "s|import \([^{]*\) from '\.\./\.\./shared/css/\([^/]*\)\.js'|import \1from '@blackbyte/sugar/css'|g" \
  -e "s|import \([^{]*\) from '\.\./\.\./shared/convert/\([^/]*\)\.js'|import \1from '@blackbyte/sugar/convert'|g" \
  -e "s|import \([^{]*\) from '\.\./package/\([^/]*\)\.js'|import \1from '@blackbyte/sugar/package'|g" \
  -e "s|import \([^{]*\) from '\.\./fs/\([^/]*\)\.js'|import \1from '@blackbyte/sugar/fs'|g" \
  {} \;

echo "Phase 4 complete: Converted cross-category imports" >> "$LOG_FILE"

# Phase 5: Handle type imports (preserve import type syntax)
echo "📝 Phase 5: Converting type imports..."

find "$SUGAR_ROOT" -name "*.ts" -exec sed -i '' \
  -e "s|import type { \([^}]*\) } from '\.\./\.\./\.\./shared/\([^/]*\)/\([^/]*\)\.js'|import type { \1 } from '@blackbyte/sugar/\2'|g" \
  -e "s|import type { \([^}]*\) } from '\.\./\.\./shared/\([^/]*\)/\([^/]*\)\.js'|import type { \1 } from '@blackbyte/sugar/\2'|g" \
  -e "s|import type { \([^}]*\) } from '\.\./when/\([^/]*\)\.js'|import type { \1 } from '@blackbyte/sugar/dom'|g" \
  {} \;

echo "Phase 5 complete: Converted type imports" >> "$LOG_FILE"

echo "✅ Import modernization completed successfully!"
echo "$(date): Import conversion completed" >> "$LOG_FILE"

# Validation
echo "🔍 Running TypeScript compilation check..."
if npm run build; then
  echo "✅ TypeScript compilation successful!"
  echo "$(date): TypeScript compilation successful" >> "$LOG_FILE"
else
  echo "❌ TypeScript compilation failed. Check errors above."
  echo "$(date): TypeScript compilation failed" >> "$LOG_FILE"
  exit 1
fi
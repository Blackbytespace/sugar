#!/bin/bash

echo "=== Fixing remaining 186 TypeScript compilation errors ==="

# Pattern 1: Fix missing exports - add convertTime to datetime exports
echo "Adding missing convertTime export to datetime..."
if ! grep -q "convertTime" src/shared/datetime/_exports.ts; then
    sed -i '' '/export {/i\
import convertTime from '\''./convertTime/convertTime.js'\'';
' src/shared/datetime/_exports.ts
    
    sed -i '' 's/export {/export {\
  convertTime as __convertTime,/' src/shared/datetime/_exports.ts
    
    sed -i '' 's/export {.*__convertTime,/export {\
  convertTime as __convertTime,\
  convertTime,/' src/shared/datetime/_exports.ts
fi

# Pattern 2: Fix same-level references that should be cross-level
echo "Fixing same-level references..."

# Fix ./functionName/functionName.js -> ../functionName/functionName.js patterns
find src -name "*.ts" -not -name "_exports.ts" -type f -exec sed -i '' 's|from '"'"'\./\([^/'"'"']*\)/\1/\1\.js'"'"'|from '"'"'../\1/\1.js'"'"'|g' {} \;

# Fix ../../category/function.js -> ../../category/function/function.js patterns  
find src -name "*.ts" -type f -exec sed -i '' 's|from '"'"'\.\./\.\./shared/crypto/base64\.js'"'"'|from '"'"'../../crypto/base64/base64.js'"'"'|g' {} \;
find src -name "*.ts" -type f -exec sed -i '' 's|from '"'"'\.\./\.\./shared/is/isPlainObject\.js'"'"'|from '"'"'../../is/isPlainObject/isPlainObject.js'"'"'|g' {} \;
find src -name "*.ts" -type f -exec sed -i '' 's|from '"'"'\.\./\.\./shared/html/replaceTags\.js'"'"'|from '"'"'../../shared/html/replaceTags/replaceTags.js'"'"'|g' {} \;
find src -name "*.ts" -type f -exec sed -i '' 's|from '"'"'\.\./\.\./shared/convert/xmlTojson\.js'"'"'|from '"'"'../../shared/convert/xmlTojson/xmlTojson.js'"'"'|g' {} \;

# Pattern 3: Fix cross-category references
echo "Fixing cross-category path references..."

# Fix js/dom trying to access shared
find src/js/dom -name "*.ts" -type f -exec sed -i '' 's|from '"'"'\.\./\.\./\.\./shared/\([^/'"'"']*\)/\([^/'"'"']*\)\.js'"'"'|from '"'"'../../../shared/\1/\2/\2.js'"'"'|g' {} \;

# Fix node trying to access shared 
find src/node -name "*.ts" -type f -exec sed -i '' 's|from '"'"'\.\./\.\./shared/\([^/'"'"']*\)/\([^/'"'"']*\)\.js'"'"'|from '"'"'../../shared/\1/\2/\2.js'"'"'|g' {} \;

# Pattern 4: Fix specific problematic path patterns
echo "Fixing specific problematic patterns..."

# Fix injectStyle uniqid reference
sed -i '' 's|from '"'"'\.\./\.\./\.\./js/string/uniqid\.js'"'"'|from '"'"'../../../../string/uniqid/uniqid.js'"'"'|g' src/js/dom/inject/injectStyle/injectStyle.ts 2>/dev/null || true

# Fix offsetFromParent reference 
sed -i '' 's|from '"'"'\./offsetFromViewport/offsetFromViewport\.js'"'"'|from '"'"'../offsetFromViewport/offsetFromViewport.js'"'"'|g' src/js/dom/offset/offsetFromParent/offsetFromParent.ts 2>/dev/null || true

# Fix query modules internal references
sed -i '' 's|from '"'"'\./closestNotVisibleElement/closestNotVisibleElement\.js'"'"'|from '"'"'../closestNotVisibleElement/closestNotVisibleElement.js'"'"'|g' src/js/dom/query/querySelector/querySelector.ts 2>/dev/null || true
sed -i '' 's|from '"'"'\./closestNotVisibleElement/closestNotVisibleElement\.js'"'"'|from '"'"'../closestNotVisibleElement/closestNotVisibleElement.js'"'"'|g' src/js/dom/query/querySelectorAll/querySelectorAll.ts 2>/dev/null || true
sed -i '' 's|from '"'"'\./matches/matches\.js'"'"'|from '"'"'../matches/matches.js'"'"'|g' src/js/dom/query/querySelectorUp/querySelectorUp.ts 2>/dev/null || true

# Fix scroll module internal references
sed -i '' 's|from '"'"'\./lockScroll/lockScroll\.js'"'"'|from '"'"'../lockScroll/lockScroll.js'"'"'|g' src/js/dom/scroll/unlockScroll/unlockScroll.ts 2>/dev/null || true

# Fix style module internal references
sed -i '' 's|from '"'"'\./getStyleProperty/getStyleProperty\.js'"'"'|from '"'"'../getStyleProperty/getStyleProperty.js'"'"'|g' src/js/dom/style/getAnimationProperties/getAnimationProperties.ts 2>/dev/null || true
sed -i '' 's|from '"'"'\./getStyleProperty/getStyleProperty\.js'"'"'|from '"'"'../getStyleProperty/getStyleProperty.js'"'"'|g' src/js/dom/style/getTransitionProperties/getTransitionProperties.ts 2>/dev/null || true
sed -i '' 's|from '"'"'\./getCssDeclarations/getCssDeclarations\.js'"'"'|from '"'"'../getCssDeclarations/getCssDeclarations.js'"'"'|g' src/js/dom/style/getKeyframesDeclarations/getKeyframesDeclarations.ts 2>/dev/null || true
sed -i '' 's|from '"'"'\./getDefinedStyles/getDefinedStyles\.js'"'"'|from '"'"'../getDefinedStyles/getDefinedStyles.js'"'"'|g' src/js/dom/style/transformKeyframesDeclarations/transformKeyframesDeclarations.ts 2>/dev/null || true

# Pattern 5: Fix the missing when.ts file by creating it or fixing _exports reference
echo "Fixing missing when.ts reference..."
if [[ -f "src/js/dom/when/_exports.ts" ]]; then
    # Remove the problematic import of when/when.js if it doesn't exist
    sed -i '' '/from .*when\/when\.js/d' src/js/dom/when/_exports.ts
    # Update the export line to remove the when reference
    sed -i '' 's/when as __when,//g' src/js/dom/when/_exports.ts
    sed -i '' 's/, when,//g' src/js/dom/when/_exports.ts  
    sed -i '' 's/when,//g' src/js/dom/when/_exports.ts
fi

# Pattern 6: Fix _exports.js references that should be _exports.js without subpath
echo "Fixing _exports.js references..."
find src -name "*.ts" -type f -exec sed -i '' 's|from '"'"'\./_exports/_exports\.js'"'"'|from '"'"'../_exports.js'"'"'|g' {} \;

# Pattern 7: Add missing isPlainObject export
echo "Adding missing isPlainObject export..."
if ! grep -q "isPlainObject" src/shared/is/_exports.ts; then
    sed -i '' '/export {/i\
import isPlainObject from '\''./isPlainObject/isPlainObject.js'\'';
' src/shared/is/_exports.ts
    
    sed -i '' 's/export {/export {\
  isPlainObject as __isPlainObject,/' src/shared/is/_exports.ts
    
    sed -i '' 's/export {.*__isPlainObject,/export {\
  isPlainObject as __isPlainObject,\
  isPlainObject,/' src/shared/is/_exports.ts
fi

echo "=== Fixes completed ==="
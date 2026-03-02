#!/bin/bash

echo "=== Fixing remaining specific path issues (181 -> fewer errors) ==="

# Fix systematic issues by examining the most common patterns

# Pattern 1: Fix missing distanceFromElementTopToViewportTop and whenRemoved exports  
echo "Adding missing exports to dom/_exports.ts..."
if [[ -f "src/js/dom/_exports.ts" ]]; then
    # Check and add distanceFromElementTopToViewportTop if missing
    if ! grep -q "distanceFromElementTopToViewportTop" src/js/dom/_exports.ts; then
        sed -i '' '/from.*distance.*_exports/a\
import { distanceFromElementTopToViewportTop } from '\''./distance/_exports.js'\'';
' src/js/dom/_exports.ts
        
        # Add to exports
        sed -i '' '/distanceFromElementTopToViewportBottom,/a\
  distanceFromElementTopToViewportTop,
' src/js/dom/_exports.ts
    fi
    
    # Check and add whenRemoved if missing  
    if ! grep -q "whenRemoved" src/js/dom/_exports.ts; then
        sed -i '' '/from.*when.*_exports/a\
import { whenRemoved } from '\''./when/_exports.js'\'';
' src/js/dom/_exports.ts
        
        # Add to exports
        sed -i '' '/whenVisible,/a\
  whenRemoved,
' src/js/dom/_exports.ts
    fi
fi

# Pattern 2: Fix the remaining same-category path issues systematically
echo "Fixing same-category path references..."

# Array module internal references
find src/shared/array -name "*.ts" -not -name "_exports.ts" -type f -exec sed -i '' 's|from '"'"'\./unique/unique\.js'"'"'|from '"'"'../unique/unique.js'"'"'|g' {} \;
find src/shared/array -name "*.ts" -not -name "_exports.ts" -type f -exec sed -i '' 's|from '"'"'\./sameItems/sameItems\.js'"'"'|from '"'"'../sameItems/sameItems.js'"'"'|g' {} \;

# Color module internal references
find src/shared/color -name "*.ts" -not -name "_exports.ts" -type f -exec sed -i '' 's|from '"'"'\./hslaToRgba/hslaToRgba\.js'"'"'|from '"'"'../hslaToRgba/hslaToRgba.js'"'"'|g' {} \;
find src/shared/color -name "*.ts" -not -name "_exports.ts" -type f -exec sed -i '' 's|from '"'"'\./parseColor/parseColor\.js'"'"'|from '"'"'../parseColor/parseColor.js'"'"'|g' {} \;
find src/shared/color -name "*.ts" -not -name "_exports.ts" -type f -exec sed -i '' 's|from '"'"'\./rgbaToHex/rgbaToHex\.js'"'"'|from '"'"'../rgbaToHex/rgbaToHex.js'"'"'|g' {} \;
find src/shared/color -name "*.ts" -not -name "_exports.ts" -type f -exec sed -i '' 's|from '"'"'\./rgbaToHsla/rgbaToHsla\.js'"'"'|from '"'"'../rgbaToHsla/rgbaToHsla.js'"'"'|g' {} \;
find src/shared/color -name "*.ts" -not -name "_exports.ts" -type f -exec sed -i '' 's|from '"'"'\./parseRgba/parseRgba\.js'"'"'|from '"'"'../parseRgba/parseRgba.js'"'"'|g' {} \;
find src/shared/color -name "*.ts" -not -name "_exports.ts" -type f -exec sed -i '' 's|from '"'"'\./parseHsla/parseHsla\.js'"'"'|from '"'"'../parseHsla/parseHsla.js'"'"'|g' {} \;
find src/shared/color -name "*.ts" -not -name "_exports.ts" -type f -exec sed -i '' 's|from '"'"'\./hexToRgba/hexToRgba\.js'"'"'|from '"'"'../hexToRgba/hexToRgba.js'"'"'|g' {} \;

# Console module internal references
find src/shared/console -name "*.ts" -not -name "_exports.ts" -type f -exec sed -i '' 's|from '"'"'\./SugarConsole/SugarConsole\.js'"'"'|from '"'"'../SugarConsole/SugarConsole.js'"'"'|g' {} \;

# Crypto module internal references  
find src/shared/crypto -name "*.ts" -not -name "_exports.ts" -type f -exec sed -i '' 's|from '"'"'\./base64/base64\.js'"'"'|from '"'"'../base64/base64.js'"'"'|g' {} \;

# Datetime module internal references
find src/shared/datetime -name "*.ts" -not -name "_exports.ts" -type f -exec sed -i '' 's|from '"'"'\./parseDate/parseDate\.js'"'"'|from '"'"'../parseDate/parseDate.js'"'"'|g' {} \;

# Extension module internal references - fix the circular dependencies
find src/shared/extension -name "*.ts" -not -name "_exports.ts" -not -name "commonFileExtensions.ts" -type f -exec sed -i '' 's|from '"'"'\./commonFileExtensions/commonFileExtensions\.js'"'"'|from '"'"'../commonFileExtensions/commonFileExtensions.js'"'"'|g' {} \;
find src/shared/extension -name "*.ts" -not -name "_exports.ts" -type f -exec sed -i '' 's|from '"'"'\./commonAudioFileExtensions/commonAudioFileExtensions\.js'"'"'|from '"'"'../commonAudioFileExtensions/commonAudioFileExtensions.js'"'"'|g' {} \;
find src/shared/extension -name "*.ts" -not -name "_exports.ts" -type f -exec sed -i '' 's|from '"'"'\./commonImageFileExtensions/commonImageFileExtensions\.js'"'"'|from '"'"'../commonImageFileExtensions/commonImageFileExtensions.js'"'"'|g' {} \;
find src/shared/extension -name "*.ts" -not -name "_exports.ts" -type f -exec sed -i '' 's|from '"'"'\./commonVideoFileExtensions/commonVideoFileExtensions\.js'"'"'|from '"'"'../commonVideoFileExtensions/commonVideoFileExtensions.js'"'"'|g' {} \;

# Pattern 3: Fix Node.js module paths 
echo "Fixing Node.js module paths..."

# Node fs module internal references
find src/node/fs -name "*.ts" -not -name "_exports.ts" -type f -exec sed -i '' 's|from '"'"'\./readJsonSync/readJsonSync\.js'"'"'|from '"'"'../readJsonSync/readJsonSync.js'"'"'|g' {} \;
find src/node/fs -name "*.ts" -not -name "_exports.ts" -type f -exec sed -i '' 's|from '"'"'\./renameSync/renameSync\.js'"'"'|from '"'"'../renameSync/renameSync.js'"'"'|g' {} \;
find src/node/fs -name "*.ts" -not -name "_exports.ts" -type f -exec sed -i '' 's|from '"'"'\./ensureDirSync/ensureDirSync\.js'"'"'|from '"'"'../ensureDirSync/ensureDirSync.js'"'"'|g' {} \;
find src/node/fs -name "*.ts" -not -name "_exports.ts" -type f -exec sed -i '' 's|from '"'"'\./moveSync/moveSync\.js'"'"'|from '"'"'../moveSync/moveSync.js'"'"'|g' {} \;
find src/node/fs -name "*.ts" -not -name "_exports.ts" -type f -exec sed -i '' 's|from '"'"'\./unlinkSync/unlinkSync\.js'"'"'|from '"'"'../unlinkSync/unlinkSync.js'"'"'|g' {} \;
find src/node/fs -name "*.ts" -not -name "_exports.ts" -type f -exec sed -i '' 's|from '"'"'\./writeFileSync/writeFileSync\.js'"'"'|from '"'"'../writeFileSync/writeFileSync.js'"'"'|g' {} \;
find src/node/fs -name "*.ts" -not -name "_exports.ts" -type f -exec sed -i '' 's|from '"'"'\./folderPath/folderPath\.js'"'"'|from '"'"'../folderPath/folderPath.js'"'"'|g' {} \;
find src/node/fs -name "*.ts" -not -name "_exports.ts" -type f -exec sed -i '' 's|from '"'"'\./extension/extension\.js'"'"'|from '"'"'../extension/extension.js'"'"'|g' {} \;
find src/node/fs -name "*.ts" -not -name "_exports.ts" -type f -exec sed -i '' 's|from '"'"'\./fileHashSync/fileHashSync\.js'"'"'|from '"'"'../fileHashSync/fileHashSync.js'"'"'|g' {} \;

# Pattern 4: Fix cross-references from different modules
echo "Fixing cross-module references..."

# Fix js/dom references to shared modules
find src/js/dom -name "*.ts" -type f -exec sed -i '' 's|from '"'"'\.\.\/style/getStyleProperty\.js'"'"'|from '"'"'../../style/getStyleProperty/getStyleProperty.js'"'"'|g' {} \;
find src/js/dom -name "*.ts" -type f -exec sed -i '' 's|from '"'"'\.\.\/query/closestScrollableElement\.js'"'"'|from '"'"'../../query/closestScrollableElement/closestScrollableElement.js'"'"'|g' {} \;
find src/js/dom -name "*.ts" -type f -exec sed -i '' 's|from '"'"'\.\./when/when\.js'"'"'|from '"'"'../../when/when/when.js'"'"'|g' {} \;

# Fix node console tagsMap reference  
find src/node/console -name "*.ts" -type f -exec sed -i '' 's|from '"'"'\./tagsMap/tagsMap\.js'"'"'|from '"'"'../tagsMap/tagsMap.js'"'"'|g' {} \;

# Pattern 5: Fix specific cross-directory issues
echo "Fixing cross-directory issues..."

# Fix array references to crypto/is
find src/shared/array -name "*.ts" -type f -exec sed -i '' 's|from '"'"'\.\.\/crypto/base64\.js'"'"'|from '"'"'../../crypto/base64/base64.js'"'"'|g' {} \;
find src/shared/array -name "*.ts" -type f -exec sed -i '' 's|from '"'"'\.\.\/is/isPlainObject\.js'"'"'|from '"'"'../../is/isPlainObject/isPlainObject.js'"'"'|g' {} \;

# Fix class references to is
find src/shared/class -name "*.ts" -type f -exec sed -i '' 's|from '"'"'\.\.\/is/isClass\.js'"'"'|from '"'"'../../is/isClass/isClass.js'"'"'|g' {} \;

echo "=== Specific path fixes completed ==="
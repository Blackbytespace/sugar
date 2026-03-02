#!/bin/bash

echo "=== Fixing specific remaining path issues ==="

# Fix specific problematic patterns we identified

# Fix distance module references
echo "Fixing distance module cross-references..."
find src -path "*/distance/*" -name "*.ts" -type f -exec sed -i '' 's|from '"'"'\.\./distance/scrollTop/scrollTop\.js'"'"'|from '"'"'../scrollTop/scrollTop.js'"'"'|g' {} \;
find src -path "*/distance/*" -name "*.ts" -type f -exec sed -i '' 's|from '"'"'\.\./offset/offsetFromViewport/offsetFromViewport\.js'"'"'|from '"'"'../../offset/offsetFromViewport/offsetFromViewport.js'"'"'|g' {} \;

# Fix event module references to _exports
echo "Fixing event module _exports references..."
find src -path "*/event/*" -name "*.ts" -type f -exec sed -i '' 's|from '"'"'\.\./\.\./dom/_exports/_exports\.js'"'"'|from '"'"'../../dom/_exports.js'"'"'|g' {} \;
find src -path "*/event/*" -name "*.ts" -type f -exec sed -i '' 's|from '"'"'\.\./_exports/_exports\.js'"'"'|from '"'"'../_exports.js'"'"'|g' {} \;

# Fix inject module cross-references to when
echo "Fixing inject module when references..."
find src -path "*/inject/*" -name "*.ts" -type f -exec sed -i '' 's|from '"'"'\.\./when/whenScriptLoaded/whenScriptLoaded\.js'"'"'|from '"'"'../../when/whenScriptLoaded/whenScriptLoaded.js'"'"'|g' {} \;
find src -path "*/inject/*" -name "*.ts" -type f -exec sed -i '' 's|from '"'"'\.\./when/whenLinkLoaded/whenLinkLoaded\.js'"'"'|from '"'"'../../when/whenLinkLoaded/whenLinkLoaded.js'"'"'|g' {} \;

# Fix inject style uniqid reference
find src -path "*/inject/*" -name "*.ts" -type f -exec sed -i '' 's|from '"'"'\.\./\.\./\.\./js/string/uniqid/uniqid\.js'"'"'|from '"'"'../../../../string/uniqid/uniqid.js'"'"'|g' {} \;

# Fix offset module internal references  
echo "Fixing offset module internal references..."
find src -path "*/offset/*" -name "*.ts" -type f -exec sed -i '' 's|from '"'"'\./offsetFromViewport/offsetFromViewport/offsetFromViewport\.js'"'"'|from '"'"'../offsetFromViewport/offsetFromViewport.js'"'"'|g' {} \;

# Fix on module cross-references to position
echo "Fixing on module position references..."
find src -path "*/on/*" -name "*.ts" -type f -exec sed -i '' 's|from '"'"'\.\./position/positionFromEvent/positionFromEvent\.js'"'"'|from '"'"'../../position/positionFromEvent/positionFromEvent.js'"'"'|g' {} \;

# Fix query module internal references
echo "Fixing query module internal references..."
find src -path "*/query/*" -name "*.ts" -type f -exec sed -i '' 's|from '"'"'\./querySelectorUp/querySelectorUp/querySelectorUp\.js'"'"'|from '"'"'../querySelectorUp/querySelectorUp.js'"'"'|g' {} \;
find src -path "*/query/*" -name "*.ts" -type f -exec sed -i '' 's|from '"'"'\./matches/matches/matches\.js'"'"'|from '"'"'../matches/matches.js'"'"'|g' {} \;
find src -path "*/query/*" -name "*.ts" -type f -exec sed -i '' 's|from '"'"'\./closestNotVisibleElement/closestNotVisibleElement/closestNotVisibleElement\.js'"'"'|from '"'"'../closestNotVisibleElement/closestNotVisibleElement.js'"'"'|g' {} \;

echo "=== Specific path fixes completed ==="
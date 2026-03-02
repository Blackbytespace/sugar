#!/bin/bash

echo "=== Fixing remaining import path issues ==="

# Fix the specific cases where functions import sibling functions incorrectly

echo "Fixing deleteCookie imports..."
# deleteCookie should import from ../setCookie, not ./setCookie
find src -name "deleteCookie.ts" -type f -exec sed -i '' 's|from '"'"'\./setCookie/setCookie\.js'"'"'|from '"'"'../setCookie/setCookie.js'"'"'|g' {} \;

echo "Fixing restoreTheme imports..."
# restoreTheme should import from sibling functions
find src -path "*/restoreTheme/restoreTheme.ts" -type f -exec sed -i '' 's|from '"'"'\./getTheme/getTheme\.js'"'"'|from '"'"'../getTheme/getTheme.js'"'"'|g' {} \;
find src -path "*/restoreTheme/restoreTheme.ts" -type f -exec sed -i '' 's|from '"'"'\./setTheme/setTheme\.js'"'"'|from '"'"'../setTheme/setTheme.js'"'"'|g' {} \;

echo "Fixing isPhone imports..."
# isPhone should import from sibling isMobile
find src -path "*/isPhone/isPhone.ts" -type f -exec sed -i '' 's|from '"'"'\./isMobile/isMobile\.js'"'"'|from '"'"'../isMobile/isMobile.js'"'"'|g' {} \;

echo "Fixing escapeQueue imports..."
# escapeQueue importing from wrong location
find src -path "*/escapeQueue/escapeQueue.ts" -type f -exec sed -i '' 's|from '"'"'\.\./string/uniqid/uniqid\.js'"'"'|from '"'"'../../string/uniqid/uniqid.js'"'"'|g' {} \;

echo "Fixing features.ts imports..."
# features.ts importing sibling functions incorrectly  
find src -path "*/features/features.ts" -type f -exec sed -i '' 's|from '"'"'\./disableTitleTooltips/disableTitleTooltips\.js'"'"'|from '"'"'../disableTitleTooltips/disableTitleTooltips.js'"'"'|g' {} \;
find src -path "*/features/features.ts" -type f -exec sed -i '' 's|from '"'"'\./scrollClasses/scrollClasses\.js'"'"'|from '"'"'../scrollClasses/scrollClasses.js'"'"'|g' {} \;
find src -path "*/features/features.ts" -type f -exec sed -i '' 's|from '"'"'\./sectionClasses/sectionClasses\.js'"'"'|from '"'"'../sectionClasses/sectionClasses.js'"'"'|g' {} \;

echo "Fixing _exports.ts files that reference ../_exports.js..."
# Some files incorrectly reference the parent _exports.js
find src -name "*.ts" -type f -exec sed -i '' 's|from '"'"'\.\./\.\./dom/_exports/_exports\.js'"'"'|from '"'"'../../dom/_exports.js'"'"'|g' {} \;
find src -name "*.ts" -type f -exec sed -i '' 's|from '"'"'\.\./_exports/_exports\.js'"'"'|from '"'"'../_exports.js'"'"'|g' {} \;

echo "Fixing composerJsonSync imports..."
find src -path "*/composerJsonSync/composerJsonSync.ts" -type f -exec sed -i '' 's|from '"'"'\./composerPackageDir/composerPackageDir\.js'"'"'|from '"'"'../composerPackageDir/composerPackageDir.js'"'"'|g' {} \;

echo "Fixing composerPackageDir imports..."  
find src -path "*/composerPackageDir/composerPackageDir.ts" -type f -exec sed -i '' 's|from '"'"'\./composerVendorDir/composerVendorDir\.js'"'"'|from '"'"'../composerVendorDir/composerVendorDir.js'"'"'|g' {} \;

echo "Fixing nodeModulesDir imports..."
find src -path "*/nodeModulesDir/nodeModulesDir.ts" -type f -exec sed -i '' 's|from '"'"'\./packageRootDir/packageRootDir\.js'"'"'|from '"'"'../packageRootDir/packageRootDir.js'"'"'|g' {} \;

echo "Fixing packageDir imports..."
find src -path "*/packageDir/packageDir.ts" -type f -exec sed -i '' 's|from '"'"'\./nodeModulesDir/nodeModulesDir\.js'"'"'|from '"'"'../nodeModulesDir/nodeModulesDir.js'"'"'|g' {} \;

echo "Fixing packageJsonSync imports..."
find src -path "*/packageJsonSync/packageJsonSync.ts" -type f -exec sed -i '' 's|from '"'"'\./packageDir/packageDir\.js'"'"'|from '"'"'../packageDir/packageDir.js'"'"'|g' {} \;

echo "Fixing addPackageDependencies imports..."
find src -path "*/addPackageDependencies/addPackageDependencies.ts" -type f -exec sed -i '' 's|from '"'"'\./packageRootDir/packageRootDir\.js'"'"'|from '"'"'../packageRootDir/packageRootDir.js'"'"'|g' {} \;

echo "Fixing detectProjectType imports..."
find src -path "*/detectProjectType/detectProjectType.ts" -type f -exec sed -i '' 's|from '"'"'\.\./package/packageRootDir/packageRootDir\.js'"'"'|from '"'"'../../package/packageRootDir/packageRootDir.js'"'"'|g' {} \;

echo "=== Remaining import fixes completed ==="
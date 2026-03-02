#!/bin/bash

echo "=== Fixing Final Path Issues ==="

cd packages/sugar || exit 1

echo "1. Fixing shared module subdirectory paths..."

# Fix paths in shared modules that need to point to subdirectories
find src/shared -name "*.ts" -exec sed -i '' 's|../string/idCompliant\.js|../../string/idCompliant/idCompliant.js|g' {} \;
find src/shared -name "*.ts" -exec sed -i '' 's|../extension/commonImageFileExtensions\.js|../../extension/commonImageFileExtensions/commonImageFileExtensions.js|g' {} \;
find src/shared -name "*.ts" -exec sed -i '' 's|../string/urlCompliant\.js|../../string/urlCompliant/urlCompliant.js|g' {} \;

# Fix object module internal paths
find src/shared/object -name "*.ts" -exec sed -i '' 's|../get/get\.js|../get/get.js|g' {} \;
find src/shared/object -name "*.ts" -exec sed -i '' 's|../set/set\.js|../set/set.js|g' {} \;

# Fix typos with extra dots
find src/shared -name "*.ts" -exec sed -i '' 's|\.\.\./set/set\.js|../set/set.js|g' {} \;
find src/shared -name "*.ts" -exec sed -i '' 's|\.\.\./get/get\.js|../get/get.js|g' {} \;

# Fix array and string imports that need subdirectory structure
find src/shared -name "*.ts" -exec sed -i '' 's|../array/unique\.js|../../array/unique/unique.js|g' {} \;
find src/shared -name "*.ts" -exec sed -i '' 's|../string/unquote\.js|../../string/unquote/unquote.js|g' {} \;
find src/shared -name "*.ts" -exec sed -i '' 's|../convert/mapToObject\.js|../../convert/mapToObject/mapToObject.js|g' {} \;

# Fix is module imports that need subdirectory structure  
find src/shared -name "*.ts" -exec sed -i '' 's|../is/isClassInstance\.js|../../is/isClassInstance/isClassInstance.js|g' {} \;
find src/shared -name "*.ts" -exec sed -i '' 's|../is/isDomElement\.js|../../is/isDomElement/isDomElement.js|g' {} \;
find src/shared -name "*.ts" -exec sed -i '' 's|../is/isArray\.js|../../is/isArray/isArray.js|g' {} \;
find src/shared -name "*.ts" -exec sed -i '' 's|../is/isBoolean\.js|../../is/isBoolean/isBoolean.js|g' {} \;
find src/shared -name "*.ts" -exec sed -i '' 's|../is/isFunction\.js|../../is/isFunction/isFunction.js|g' {} \;
find src/shared -name "*.ts" -exec sed -i '' 's|../is/isJson\.js|../../is/isJson/isJson.js|g' {} \;
find src/shared -name "*.ts" -exec sed -i '' 's|../is/isMap\.js|../../is/isMap/isMap.js|g' {} \;
find src/shared -name "*.ts" -exec sed -i '' 's|../is/isObject\.js|../../is/isObject/isObject.js|g' {} \;

# Fix object and array cross-references
find src/shared -name "*.ts" -exec sed -i '' 's|../object/clone\.js|../../object/clone/clone.js|g' {} \;
find src/shared -name "*.ts" -exec sed -i '' 's|../object/mapDeep\.js|../../object/mapDeep/mapDeep.js|g' {} \;
find src/shared -name "*.ts" -exec sed -i '' 's|../array/proxyArray\.js|../../array/proxyArray/proxyArray.js|g' {} \;

# Fix remaining string and parse imports
find src/shared -name "*.ts" -exec sed -i '' 's|../string/parse\.js|../../string/parse/parse.js|g' {} \;
find src/shared -name "*.ts" -exec sed -i '' 's|../string/ltrim\.js|../../string/ltrim/ltrim.js|g' {} \;

# Fix crypto path in url module
find src/shared/url -name "*.ts" -exec sed -i '' 's|../../shared/crypto/md5\.js|../../crypto/md5/md5.js|g' {} \;

# Fix node/type path to shared/type
find src/node/type -name "*.ts" -exec sed -i '' 's|../../shared/type/parseTypeString/parseTypeString\.js|../../../shared/type/parseTypeString/parseTypeString.js|g' {} \;

echo "2. Running TypeScript compilation to check final results..."
npx tsc --noEmit 2>&1 | tee build_output.txt
echo "Final error count:"
cat build_output.txt | wc -l
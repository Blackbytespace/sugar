#!/bin/bash

echo "=== Starting comprehensive import/export fixes ==="

# Step 1: Fix _exports.ts files to use subdirectory structure
echo "Step 1: Fixing _exports.ts files..."
find src -name "_exports.ts" -type f | while read -r file; do
    echo "Processing: $file"
    
    # Fix import paths: ./functionName.js -> ./functionName/functionName.js
    sed -i '' 's|from '"'"'\./\([^/'"'"']*\)\.js'"'"'|from '"'"'./\1/\1.js'"'"'|g' "$file"
    
    # Fix import paths: ./functionName/functionName -> ./functionName/functionName.js (if missing .js)
    sed -i '' 's|from '"'"'\./\([^/'"'"']*\)/\1'"'"'$|from '"'"'./\1/\1.js'"'"'|g' "$file"
done

# Step 2: Fix internal relative imports within categories
echo "Step 2: Fixing internal relative imports..."
find src -name "*.ts" -not -name "_exports.ts" -type f | while read -r file; do
    echo "Processing: $file"
    
    # Fix relative imports: ../functionName.js -> ../functionName/functionName.js
    sed -i '' 's|from '"'"'\.\./\([^/'"'"']*\)\.js'"'"'|from '"'"'../\1/\1.js'"'"'|g' "$file"
    
    # Fix same-level imports: ./functionName.js -> ./functionName/functionName.js
    sed -i '' 's|from '"'"'\./\([^/'"'"']*\)\.js'"'"'|from '"'"'./\1/\1.js'"'"'|g' "$file"
    
    # Fix deeper relative imports: ../../category/functionName.js -> ../../category/functionName/functionName.js
    sed -i '' 's|from '"'"'\.\./\.\./\([^/'"'"']*\)/\([^/'"'"']*\)\.js'"'"'|from '"'"'../../\1/\2/\2.js'"'"'|g' "$file"
    
    # Fix 3-level relative imports: ../../../category/functionName.js -> ../../../category/functionName/functionName.js
    sed -i '' 's|from '"'"'\.\./\.\./\.\./\([^/'"'"']*\)/\([^/'"'"']*\)\.js'"'"'|from '"'"'../../../\1/\2/\2.js'"'"'|g' "$file"
done

# Step 3: Fix specific patterns we saw in errors
echo "Step 3: Fixing specific problematic patterns..."

# Fix the node/fs/writeFile _exports.ts reference
find src -path "*/writeFile/*.ts" -type f -exec sed -i '' 's|from '"'"'\./_exports\.js'"'"'|from '"'"'../_exports.js'"'"'|g' {} \;

# Fix node string uniqid references
find src -type f -name "*.ts" -exec sed -i '' 's|from '"'"'\.\./\.\./node/string/uniqid\.js'"'"'|from '"'"'../../string/uniqid/uniqid.js'"'"'|g' {} \;

# Fix js string uniqid references  
find src -type f -name "*.ts" -exec sed -i '' 's|from '"'"'\.\./string/uniqid\.js'"'"'|from '"'"'../string/uniqid/uniqid.js'"'"'|g' {} \;

echo "=== Import/export fixes completed ==="
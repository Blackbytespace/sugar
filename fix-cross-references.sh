#!/bin/bash

echo "=== Fixing cross-references after file reorganization ==="

# Since all files are now in subdirectories, we need to update all relative imports
# Pattern: ../category/function.js -> ../category/function/function.js
# Pattern: ./function.js -> ./function/function.js  
# Pattern: ../../category/function.js -> ../../category/function/function.js

find src -name "*.ts" -not -name "_exports.ts" -not -path "*/tests/*" -type f | while read -r file; do
    echo "Processing: $file"
    
    # Fix 1-level back relative imports: ../function.js -> ../function/function.js
    sed -i '' 's|from '"'"'\.\./\([^/'"'"']*\)\.js'"'"'|from '"'"'../\1/\1.js'"'"'|g' "$file"
    
    # Fix same-level imports: ./function.js -> ./function/function.js  
    sed -i '' 's|from '"'"'\./\([^/'"'"']*\)\.js'"'"'|from '"'"'./\1/\1.js'"'"'|g' "$file"
    
    # Fix 2-level back relative imports: ../../category/function.js -> ../../category/function/function.js
    sed -i '' 's|from '"'"'\.\./\.\./\([^/'"'"']*\)/\([^/'"'"']*\)\.js'"'"'|from '"'"'../../\1/\2/\2.js'"'"'|g' "$file"
    
    # Fix 3-level back relative imports: ../../../category/function.js -> ../../../category/function/function.js
    sed -i '' 's|from '"'"'\.\./\.\./\.\./\([^/'"'"']*\)/\([^/'"'"']*\)\.js'"'"'|from '"'"'../../../\1/\2/\2.js'"'"'|g' "$file"
    
    # Fix 4-level back relative imports: ../../../../category/function.js -> ../../../../category/function/function.js
    sed -i '' 's|from '"'"'\.\./\.\./\.\./\.\./\([^/'"'"']*\)/\([^/'"'"']*\)\.js'"'"'|from '"'"'../../../../\1/\2/\2.js'"'"'|g' "$file"
done

echo "=== Cross-reference fixes completed ==="
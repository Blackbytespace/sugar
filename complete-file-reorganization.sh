#!/bin/bash

echo "=== Moving remaining files to proper subdirectory structure ==="

# Find all TypeScript files that are not in the proper subdirectory structure
# (excluding _exports.ts and test files)
find src -name "*.ts" -not -name "_exports.ts" -not -path "*/tests/*" | while read -r file; do
    basename_no_ext=$(basename "$file" .ts)
    dirname=$(dirname "$file")
    
    # Check if file is already in the correct subdirectory structure
    if [[ "$dirname" != *"$basename_no_ext" ]]; then
        echo "Moving: $file"
        
        # Create the subdirectory if it doesn't exist
        subdir="$dirname/$basename_no_ext"
        mkdir -p "$subdir"
        
        # Move the file to the subdirectory
        mv "$file" "$subdir/$basename_no_ext.ts"
    fi
done

echo "=== File reorganization completed ==="
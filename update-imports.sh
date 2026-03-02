#!/bin/bash

# Advanced Import Path Updater for Sugar Package Reorganization
# Handles complex import patterns and cross-category dependencies

SUGAR_SRC="/Users/olivier/data/web/blackbyte/monorepo/packages/sugar/src"
LOG_FILE="import-updates.log"

log() {
  echo "$(date '+%Y-%m-%d %H:%M:%S') $1" | tee -a "$LOG_FILE"
}

# Function to update cross-category imports
update_cross_category_imports() {
  local category_path=$1
  local category_name=$(basename "$category_path")
  
  log "🔗 Updating cross-category imports in $category_name"
  
  # Find all TypeScript files in the category
  find "$category_path" -name "*.ts" ! -name "*.test.ts" | while read -r file; do
    if [[ -f "$file" ]]; then
      local temp_file="${file}.tmp"
      local updated=false
      
      # Update relative imports that reference other files in different categories
      # Pattern: ../categoryName/fileName.js -> ../categoryName/fileName/fileName.js
      sed 's|from \.\./\([^/]*\)/\([^/]*\)\.js|from ../\1/\2/\2.js|g' "$file" > "$temp_file"
      
      if ! diff -q "$file" "$temp_file" >/dev/null 2>&1; then
        mv "$temp_file" "$file"
        log "   ✓ Updated cross-category imports in $(basename "$file")"
        updated=true
      else
        rm -f "$temp_file"
      fi
      
      # Update same-directory imports if not already updated
      if [[ ! $updated ]]; then
        sed 's|from \./\([^/]*\)\.js|from ./\1/\1.js|g' "$file" > "$temp_file"
        
        if ! diff -q "$file" "$temp_file" >/dev/null 2>&1; then
          mv "$temp_file" "$file" 
          log "   ✓ Updated same-directory imports in $(basename "$file")"
        else
          rm -f "$temp_file"
        fi
      fi
    fi
  done
}

# Function to validate import updates
validate_imports() {
  local category_path=$1
  local category_name=$(basename "$category_path")
  
  log "🔍 Validating imports in $category_name"
  
  # Check for any remaining old-style imports
  local old_imports=$(find "$category_path" -name "*.ts" -exec grep -l "from '\\.\/[^/]*\\.js'" {} \; 2>/dev/null || true)
  
  if [[ -n "$old_imports" ]]; then
    log "   ⚠️  Found remaining old-style imports in $category_name:"
    echo "$old_imports" | while read -r file; do
      log "      - $(basename "$file")"
    done
    return 1
  else
    log "   ✅ All imports updated correctly in $category_name"
    return 0
  fi
}

# Categories that need import updates
CATEGORIES_TO_UPDATE=(
  "shared/function"
  "shared/html" 
  "shared/css"
  "shared/datetime"
  "shared/color"
  "shared/easing"
  "shared/extension"
  "shared/array"
  "node/is"
  "js/is"
  "shared/is"
  "shared/string" 
  "shared/object"
  "node/package"
  "node/fs"
  "js/dom"
)

# Main execution
main() {
  log "🚀 Starting advanced import path updates"
  
  cd "$SUGAR_SRC"
  
  for category in "${CATEGORIES_TO_UPDATE[@]}"; do
    local category_path="$SUGAR_SRC/$category"
    
    if [[ -d "$category_path" ]]; then
      update_cross_category_imports "$category_path"
      validate_imports "$category_path" || log "   ⚠️  Validation issues in $category - may need manual review"
    else
      log "⚠️  Category not found: $category"
    fi
  done
  
  log "🎉 Import path updates completed!"
}

# Execute
main "$@"
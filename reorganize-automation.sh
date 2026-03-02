#!/bin/bash

# Sugar Package Reorganization Automation Script
# Reorganizes TypeScript files into individual subdirectories

set -e  # Exit on any error

SUGAR_SRC="/Users/olivier/data/web/blackbyte/monorepo/packages/sugar/src"
LOG_FILE="reorganization.log"

log() {
  echo "$(date '+%Y-%m-%d %H:%M:%S') $1" | tee -a "$LOG_FILE"
}

# Function to reorganize a single category
reorganize_category() {
  local category_path=$1
  local category_name=$(basename "$category_path")
  
  log "📁 Processing category: $category_name"
  
  if [[ ! -d "$category_path" ]]; then
    log "❌ Directory not found: $category_path"
    return 1
  fi
  
  cd "$category_path"
  
  # Count files to be processed
  local file_count=$(find . -maxdepth 1 -name "*.ts" ! -name "_exports.ts" ! -name "*.test.ts" | wc -l)
  
  if [[ $file_count -eq 0 ]]; then
    log "   No files to process in $category_name"
    return 0
  fi
  
  log "   Processing $file_count files in $category_name"
  
  # Move each TypeScript file to its own subdirectory
  find . -maxdepth 1 -name "*.ts" ! -name "_exports.ts" ! -name "*.test.ts" | while read -r file; do
    if [[ -f "$file" ]]; then
      local filename=$(basename "$file" .ts)
      
      # Skip if directory already exists (already processed)
      if [[ -d "$filename" ]]; then
        log "   ⏭️  Skipping $filename (already exists)"
        continue
      fi
      
      # Create subdirectory and move file
      mkdir -p "$filename"
      mv "$file" "$filename/$filename.ts"
      log "   ✓ Moved: $file → $filename/$filename.ts"
    fi
  done
  
  log "   ✅ Completed category: $category_name"
}

# Function to update _exports.ts file
update_exports_file() {
  local exports_file=$1
  local category_name=$(dirname "$exports_file" | xargs basename)
  
  if [[ ! -f "$exports_file" ]]; then
    log "   ⚠️  No _exports.ts found in $category_name"
    return 0
  fi
  
  log "   📝 Updating _exports.ts for $category_name"
  
  # Create backup
  cp "$exports_file" "${exports_file}.bak"
  
  # Update import paths from './filename.js' to './filename/filename.js'
  sed -i.tmp "s|from '\\.\/\\([^/]*\\)\\.js'|from './\\1/\\1.js'|g" "$exports_file"
  
  # Also handle double quotes
  sed -i.tmp "s|from \"\\.\/\\([^/]*\\)\\.js\"|from \"./\\1/\\1.js\"|g" "$exports_file"
  
  # Clean up temp file
  rm -f "${exports_file}.tmp"
  
  log "   ✅ Updated _exports.ts for $category_name"
}

# Define remaining categories to process
REMAINING_CATEGORIES=(
  # Phase 3 remaining (completing medium-risk dependent)
  "shared/function"
  "shared/html" 
  "shared/css"
  "shared/datetime"
  "shared/color"
  
  # Phase 4 (foundation categories)
  "shared/easing"
  
  # Phase 5 (critical infrastructure) 
  "shared/extension"
  "shared/array"
  "node/is"
  "js/is"
  
  # Phase 6 (core infrastructure - handle carefully)
  "shared/is"
  "shared/string" 
  "shared/object"
  
  # Phase 7 (complex dependents)
  "node/package"
  "node/fs"
  "js/dom"
)

# Main execution
main() {
  log "🚀 Starting automated reorganization of remaining categories"
  log "📊 Processing ${#REMAINING_CATEGORIES[@]} categories"
  
  cd "$SUGAR_SRC"
  
  # Process each category
  for category in "${REMAINING_CATEGORIES[@]}"; do
    local category_path="$SUGAR_SRC/$category"
    
    if [[ -d "$category_path" ]]; then
      reorganize_category "$category_path"
      
      # Update the _exports.ts file for this category
      local exports_file="$category_path/_exports.ts"
      update_exports_file "$exports_file"
    else
      log "⚠️  Category not found: $category"
    fi
  done
  
  log "🎉 Automated reorganization completed successfully!"
  log "📈 Total categories processed: ${#REMAINING_CATEGORIES[@]}"
}

# Error handler
error_handler() {
  local exit_code=$?
  log "❌ Error occurred (exit code: $exit_code)"
  log "🔄 You can safely re-run this script to continue from where it left off"
  exit $exit_code
}

trap error_handler ERR

# Execute if script is run directly
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  main "$@"
fi
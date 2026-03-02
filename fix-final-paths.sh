#!/bin/bash

echo "=== Final comprehensive path fixes ==="

# Fix any remaining broken patterns we can identify programmatically

# Pattern 1: Fix same-category imports that go through the category name
echo "Fixing same-category imports..."
find src -name "*.ts" -not -name "_exports.ts" -type f | while read -r file; do
    # Get the category name (second-to-last directory)
    category=$(dirname "$file" | awk -F'/' '{print $(NF-1)}')
    if [[ -n "$category" ]]; then
        # Fix patterns like ../category/function.js -> ../function/function.js (when already in category)
        sed -i '' "s|from '\"'\\.\\./\\${category}/\\([^/]\"'*\\)\\.js'\"'|from '\"'../\\1/\\1.js'\"'|g" "$file"
    fi
done

# Pattern 2: Fix double subdirectories
echo "Fixing double subdirectories..."
find src -name "*.ts" -type f -exec sed -i '' 's|/\([^/]*\)/\1/\1\.js|/\1/\1.js|g' {} \;

# Pattern 3: Fix specific known broken patterns
echo "Fixing specific broken patterns..."

# Fix distance to scrollTop (same directory)
sed -i '' 's|from '"'"'\.\./distance/scrollTop\.js'"'"'|from '"'"'../scrollTop/scrollTop.js'"'"'|g' src/js/dom/distance/distanceFromElementTopToViewportBottom/distanceFromElementTopToViewportBottom.ts
sed -i '' 's|from '"'"'\.\./distance/scrollTop\.js'"'"'|from '"'"'../scrollTop/scrollTop.js'"'"'|g' src/js/dom/distance/distanceFromElementTopToViewportTop/distanceFromElementTopToViewportTop.ts

# Fix distance to offset (different directory)  
sed -i '' 's|from '"'"'\.\./offset/offsetFromViewport\.js'"'"'|from '"'"'../../offset/offsetFromViewport/offsetFromViewport.js'"'"'|g' src/js/dom/distance/distanceFromElementTopToViewportBottom/distanceFromElementTopToViewportBottom.ts
sed -i '' 's|from '"'"'\.\./offset/offsetFromViewport\.js'"'"'|from '"'"'../../offset/offsetFromViewport/offsetFromViewport.js'"'"'|g' src/js/dom/distance/distanceFromElementTopToViewportTop/distanceFromElementTopToViewportTop.ts

# Fix inject to when
if [[ -f "src/js/dom/inject/injectScript/injectScript.ts" ]]; then
    sed -i '' 's|from '"'"'\.\./when/whenScriptLoaded\.js'"'"'|from '"'"'../../when/whenScriptLoaded/whenScriptLoaded.js'"'"'|g' src/js/dom/inject/injectScript/injectScript.ts
fi
if [[ -f "src/js/dom/inject/injectStylesheet/injectStylesheet.ts" ]]; then
    sed -i '' 's|from '"'"'\.\./when/whenLinkLoaded\.js'"'"'|from '"'"'../../when/whenLinkLoaded/whenLinkLoaded.js'"'"'|g' src/js/dom/inject/injectStylesheet/injectStylesheet.ts  
fi

# Fix on to position
if [[ -f "src/js/dom/on/onDrag/onDrag.ts" ]]; then
    sed -i '' 's|from '"'"'\.\./position/positionFromEvent\.js'"'"'|from '"'"'../../position/positionFromEvent/positionFromEvent.js'"'"'|g' src/js/dom/on/onDrag/onDrag.ts
fi

# Fix query internal references
if [[ -f "src/js/dom/query/closestElement/closestElement.ts" ]]; then
    sed -i '' 's|from '"'"'\./querySelectorUp/querySelectorUp\.js'"'"'|from '"'"'../querySelectorUp/querySelectorUp.js'"'"'|g' src/js/dom/query/closestElement/closestElement.ts
fi
if [[ -f "src/js/dom/query/closestScrollableElement/closestScrollableElement.ts" ]]; then
    sed -i '' 's|from '"'"'\./querySelectorUp/querySelectorUp\.js'"'"'|from '"'"'../querySelectorUp/querySelectorUp.js'"'"'|g' src/js/dom/query/closestScrollableElement/closestScrollableElement.ts
fi
if [[ -f "src/js/dom/query/nextElement/nextElement.ts" ]]; then
    sed -i '' 's|from '"'"'\./matches/matches\.js'"'"'|from '"'"'../matches/matches.js'"'"'|g' src/js/dom/query/nextElement/nextElement.ts
fi
if [[ -f "src/js/dom/query/previousElement/previousElement.ts" ]]; then
    sed -i '' 's|from '"'"'\./matches/matches\.js'"'"'|from '"'"'../matches/matches.js'"'"'|g' src/js/dom/query/previousElement/previousElement.ts
fi

echo "=== Final path fixes completed ==="
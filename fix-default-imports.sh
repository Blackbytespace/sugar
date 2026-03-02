#!/bin/bash

echo "=== Fixing Default Import Issues ==="

cd packages/sugar || exit 1

# Fix the most common pattern: import funcName from '@blackbyte/sugar/dom';
# to: import { funcName } from '@blackbyte/sugar/dom';

echo "1. Fixing injectStylesheet import..."
sed -i '' 's|import __whenStylesheetsReady from '\''@blackbyte/sugar/dom'\'';|import { whenStylesheetsReady } from '\''@blackbyte/sugar/dom'\'';|g' src/js/dom/inject/injectStylesheet/injectStylesheet.ts

echo "2. Fixing whenNearViewport import..."  
sed -i '' 's|import __elementsInViewport from '\''@blackbyte/sugar/dom'\'';|import { elementsInViewport } from '\''@blackbyte/sugar/dom'\'';|g' src/js/dom/when/whenNearViewport/whenNearViewport.ts

echo "3. Fixing whenBackgroundImageLoaded import..."
sed -i '' 's|import __getDefinedStyles from '\''@blackbyte/sugar/dom'\'';|import { getDefinedStyles } from '\''@blackbyte/sugar/dom'\'';|g' src/js/dom/when/whenBackgroundImageLoaded/whenBackgroundImageLoaded.ts

echo "4. Fixing onDrag import..."
sed -i '' 's|import __offsetFromViewport from '\''@blackbyte/sugar/dom'\'';|import { offsetFromViewport } from '\''@blackbyte/sugar/dom'\'';|g' src/js/dom/on/onDrag/onDrag.ts

echo "5. Fixing usage of imported functions..."
# Fix the usage in injectStylesheet
sed -i '' 's|__whenStylesheetsReady|whenStylesheetsReady|g' src/js/dom/inject/injectStylesheet/injectStylesheet.ts

# Fix usage in whenNearViewport  
sed -i '' 's|__elementsInViewport|elementsInViewport|g' src/js/dom/when/whenNearViewport/whenNearViewport.ts

# Fix usage in whenBackgroundImageLoaded
sed -i '' 's|__getDefinedStyles|getDefinedStyles|g' src/js/dom/when/whenBackgroundImageLoaded/whenBackgroundImageLoaded.ts

# Fix usage in onDrag
sed -i '' 's|__offsetFromViewport|offsetFromViewport|g' src/js/dom/on/onDrag/onDrag.ts

echo "6. Running TypeScript compilation to check progress..."
npx tsc --noEmit 2>&1 | tee build_output.txt | wc -l
![Blackbyte Sugar](https://github.com/Blackbytespace/sugar/blob/main/assets/blackbyte-sugar-og.png?raw=true)

# Blackbyte Sugar

The toolkit that you missed... like a sugar in your coffee!

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Blackbyte Sugar](#blackbyte-sugar)
  - [What is this?](#what-is-this)
  - [Get started](#get-started)
    - [1. Install the package](#1-install-the-package)
    - [2. Discover the API](#2-discover-the-api)
    - [3. Import what you need](#3-import-what-you-need)
  - [Samples](#samples)
      - [Query like a pro](#query-like-a-pro)
      - [Is this a...?](#is-this-a)
      - [Cryptography](#cryptography)
      - [Execute this when...](#execute-this-when)
      - [Array utilities](#array-utilities)
      - [Convert colors](#convert-colors)
      - [Time is... time](#time-is-time)
  - [Contribute](#contribute)

<!-- /code_chunk_output -->

## What is this?

This project has for goal to provide high quality utilities through 1 package. Consider this as a swiss knife for web development.

It will continue to grow with utilities that make sens and that we can make use of everyday. The goal is to make our daily job as pleasant as possible.

Don't be afraid to propose some new utilities. Make sure to read [our contribution guidelines first](./CONTRIBUTE.md).

## Get started

Start using `@blackbyte/sugar` in your project with this quick guide.

### 1. Install the package

You can install `@blackbyte/sugar` using npm, yarn or pnpm.

```sh
npm install @blackbyte/sugar
```

### 2. Discover the API

Go to the official [sugar.blackbyte.space](https://sugar.blackbyte.space) website to discover the full API.

Press `CMD + P` on the website to open the command palette and start typing to search for available functions.

### 3. Import what you need

Import the components you need from `@blackbyte/sugar` in your project files.

```ts
import { querySelectorLive } from '@blackbyte/sugar/dom';
import { pickRandom, unique } from '@blackbyte/sugar/array';
import { sleep, timeAgo } from '@blackbyte/sugar/datetime';
import { formatFileSize, formatDuration } from '@blackbyte/sugar/format';
// etc...
```

## Samples

#### Query like a pro

A set of utility functions to query the DOM in a more efficient way.

```ts
import {
  querySelector,
  querySelectorLive,
  querySelectorUp,
} from '@blackbyte/sugar/dom';
// query the first element that is in the viewport
const $elm = querySelector('.my-cool-item', {
  inViewport: true,
});
// live query some elements when they are added to the DOM
const query = querySelectorLive('.my-cool-item', ($elm, api) => {
  // do something here with the detected element
  // call api.cancel if you want to stop listening for this selector
  api.cancel();
});
// query the first element that is a parent of the given selector
const $elmUp = querySelectorUp($from, '.my-cool-item');
```

#### Is this a...?

A bunch of utility functions to validate common data types like email, path, etc.

```ts
import {
  isEmail,
  isPath,
  isNode,
  isUrl,
  isGlob,
  isCreditCard,
  isPlainObject,
  isJson,
} from '@blackbyte/sugar/dom';
isEmail('hello@blackbyte.com'); // true
isPath('/path/to/file'); // true
isNode(); // true if runtime is node, false if not
isUrl('https://blackbyte.space'); // true
isGlob('*.js'); // true
isCreditCard('4111111111111111'); // true
isPlainObject({}); // true
isJson('{"key": "value"}'); // true
// and a lot more to discover
```

#### Cryptography

A set of cryptographic functions for hashing and encoding data.

```ts
import { md5, base64, sha256, sha512 } from '@blackbyte/sugar/crypto';

// md5 hash
md5.encrypt('hello world');
// 5eb63bbbe01eeed093cb22bb8f5acdc3
// base64 encode
base64.encrypt('hello world');
// aGVsbG8gd29ybGQ=
// sha256 hash
sha256.encrypt('hello world');
// b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9
// sha512 hash
sha512.encrypt('hello world');
// 309ecc489c12d6eb4cc40f50c902f2b4d0ed77ee511a7c7a9bcd...
// and a lot more to discover
```

#### Execute this when...

A set of utility functions to execute code when certain conditions are met.

```ts
import {
  whenVisible,
  whenInViewport,
  whenNearViewport,
  whenImageLoaded,
  whenInteract,
} from '@blackbyte/sugar/dom';
// execute code when the element is visible
whenVisible($elm).then(() => {
  console.log('Element is visible');
});
// execute code when the element is in the viewport
whenInViewport($elm).then(() => {
  console.log('Element is in the viewport');
});
// execute code when the element is near the viewport
whenNearViewport($elm).then(() => {
  console.log('Element is near the viewport');
});
// execute code when the image is loaded
whenImageLoaded($img).then(() => {
  console.log('Image is loaded');
});
// execute code when the element is interacted with
whenInteract($elm).then(() => {
  console.log('Element is interacted with');
});
// and a lot more to discover
```

#### Array utilities

A set of utility functions to manipulate arrays in a more efficient way.

```ts
import {
  pickRandom,
  pickSome,
  intersection,
  splitEvery,
  unique
} from '@blackbyte/sugar/array'
// pick a random element from the array
pickRandom([1, 2, 3, 4, 5])]
// pick some elements from the array randomly
pickSome([1, 2, 3, 4, 5], 2) // [2, 4]
// find the intersection of two arrays
intersection([1, 2, 3], [2, 3, 4]) // [2, 3]
// split an array into chunks
splitEvery([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
// get unique elements from an array
unique([1, 2, 2, 3, 4, 4, 5]) // [1, 2, 3, 4, 5]
// and a lot more to discover
```

#### Convert colors

A set of utility functions to manipulate colors in a more efficient way.

```ts
import {
  hexToRgba,
  hexToRgb,
  hslaToHexa,
  hslaToRgba,
  parseColor,
  convertColor,
} from '@blackbyte/sugar/array';
// convert hex to rgba
hexToRgba('#ff0000'); // { r: 255, g: 0, b: 0, a: 1, toString }
// convert hex to rgb
hexToRgb('#ff0000'); // { r: 255, g: 0, b: 0, toString }
// convert hsla to hexa
hslaToHexa('hsla(0, 100%, 50%, 1)'); // #ff0000ff
// convert hsla to rgba
hslaToRgba('hsla(0, 100%, 50%, 1)'); // { r: 255, g: 0, b: 0, a: 1, toString }
// parse a color string
parseColor('#ff0000'); // { r: 255, g: 0, b: 0, a: 1, toString }
parseColor('#ff0000', 'hsla'); // { h: 0, s: 100, l: 50, a: 1, toString }
// convert a color to a specific format
convertColor('#ff0000', 'rgba'); // { r: 255, g: 0, b: 0, a: 1, toString }
convertColor('#ff0000', 'hsl'); // { h: 0, s: 100, l: 50, toString }
convertColor('#ff0000', 'hex'); // #ff0000
// and a lot more to discover
```

#### Time is... time

A set of utility functions to manipulate time in a more efficient way.

```ts
import {
  convertTime,
  sleep,
  timeAgo,
  formatDuration,
} from '@blackbyte/sugar/datetime';
// convert time from one format to another
convertTime('10s', 'ms'); // => 10000
convertTime('10days', 'hours'); // => 240
convertTime('10h', 'minutes'); // => 600
// format a duration in a human readable way
formatDuration(1000); // => 1s
formatDuration(60000); // => 1m
// sleep for a given time
await sleep(1000); // => waits for 1 second
// get the time ago from a date
timeAgo(new Date('2023-01-01')); // => "9 months ago"
timeAgo(1704067200000); // => "9 months ago"
// and a lot more to discover
```

## Contribute

To contribute, make sure to [follow our contribution rules](./CONTRIBUTE.md).

Everyone is welcome as long that it's made in good intelligence and respect 💜.

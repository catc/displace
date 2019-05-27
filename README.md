
# displace.js

A minimal javascript library to enable moveable DOM elements.
- ~1.2kb gzipped
- supports mobile touch
- no dependencies/bloat
- IE9+

## Getting started
#### Reference
Install via npm:

```sh
npm install --save displacejs
```

Reference `displace.min.js` and use via `displace`:
```javascript
// es6
import displace from 'displacejs';

// commonjs
let displace = require('displace');

// if using globally in browser
const displace = window.displacejs;
```

#### Initialize
Initialize and use:
```javascript
// initial
const d = displace(document.querySelector('.some-div'), options);
```

## API

### Methods
#### `displace(element, options)`
Creates a new displace instance with a DOM element. For options, see [below](#options).

#### `reinit()`
Runs setup again. Useful when divs have been moved or resized.

#### `displace.destroy()`
Removes event listeners and destroys instance.

<br>

### Options
#### `constrain`
Constrains element to its parent container
##### Default: `false`

#### `relativeTo`
Constrains element to the specified DOM element. Requires `constrain` to be `true`.
##### Default: `null`

#### `handle`
Assigns a child element as the moveable handle for the parent element.
##### Default: `null`

#### `highlightInputs`
Allows you to highlight text in inputs and textareas by disabling drag events originating from those elements.
##### Default: `false`

<br>

#### `onMouseDown`
Function that is triggered when user clicks down on moveable element.
##### Default: `null`

#### `onMouseMove`
Function that is triggered when user moves element.
##### Default: `null`

#### `onMouseUp`
Function that is triggered when user clicks up on moveable element.
##### Default: `null`

#### `onTouchStart`
Function that is triggered when initiates touch event.
##### Default: `null`

#### `onTouchMove`
Function that is triggered when moves element during touch event.
##### Default: `null`

#### `onTouchStop`
Function that is triggered when user ends touch event.
##### Default: `null`

<br>

#### `customMove`
Function that can be used to override how x and y are being set on the displaced element on move.
##### Default: `null`

## Development
Clone the repo and `npm install`. Available `npm` scripts are:
- build library: `lib-build`
- library development (watch src files and build on change): `lib-dev`
- docs development (port 3001): `docs-dev`

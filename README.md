
# displace.js

A minimal javascript library to enable moveable DOM elements.
- ~1.2kb gzipped
- no dependencies/bloat
- IE9+

## Getting started
#### Reference
Reference `displace.min.js` and use via `displace`. If using a module loader:
```javascript
// commonjs
let displace = require('displace');

// es6
import displace from 'dist/displace.min.js;
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



### Options
#### `constrain`
Constrains element to its parent container
##### Default: `false`

#### `relativeTo`
Constrains element to the specified DOM element. Requires `constrain` to be `true`.
##### Default: `null`

#### `onMouseDown`
Function that is triggered when user clicks down on moveable element.
##### Default: `null`

#### `onMouseMove`
Function that is triggered when user moves element.
##### Default: `null`

#### `onMouseUp`
Function that is triggered when user clicks up on moveable element.
##### Default: `null`

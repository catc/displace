
# displace.js

A tiny javascript library for creating moveable and draggable DOM elements.
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
import displace = require('displace');
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
##### Default: `undefined`
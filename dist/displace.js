/*!
 * displacejs.js 1.2.4 - Tiny javascript library to create moveable DOM elements.
 * Copyright (c) 2017 Catalin Covic - https://github.com/catc/displace
 * License: MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["displacejs"] = factory();
	else
		root["displacejs"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _displace = __webpack_require__(1);

	var _displace2 = _interopRequireDefault(_displace);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = _displace2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _utils = __webpack_require__(2);

	var _events = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var defaultOpts = {
		constrain: false,
		relativeTo: null,
		handle: null,
		highlightInputs: false,

		// events
		onMouseDown: null,
		onMouseMove: null,
		onMouseUp: null,
		onTouchStart: null,
		onTouchMove: null,
		onTouchStop: null
	};

	var Displace = function () {
		function Displace(el, opts) {
			_classCallCheck(this, Displace);

			if (!el) {
				throw Error('Must include moveable element');
			}
			this.el = el;
			this.opts = opts;

			// init
			setup.call(this);
		}

		Displace.prototype.reinit = function reinit() {
			this.destroy();
			setup.call(this);
		};

		Displace.prototype.destroy = function destroy() {
			var events = this.events;

			this.handle.removeEventListener('mousedown', events.mousedown, false);
			document.removeEventListener('mousemove', events.mousemove, false);
			document.removeEventListener('mouseup', events.mouseup, false);

			this.handle.removeEventListener('touchstart', events.touchstart, false);
			document.removeEventListener('touchmove', events.touchmove, false);
			document.removeEventListener('touchstop', events.touchstop, false);
		};

		return Displace;
	}();

	function setup() {
		var el = this.el;
		var opts = this.opts || defaultOpts;
		var data = {};

		// set required css
		el.style.position = 'absolute';

		// set the handle
		this.handle = opts.handle || el;

		// generate min / max ranges
		if (opts.constrain) {
			var relTo = opts.relativeTo || el.parentNode;

			var traverse = el;
			var minX = 0;
			var minY = 0;
			while (traverse !== relTo) {
				traverse = traverse.parentNode;
				if ((0, _utils.isRelative)(traverse)) {
					minX -= traverse.offsetLeft;
					minY -= traverse.offsetTop;
				}
				if (traverse === relTo) {
					minX += traverse.offsetLeft;
					minY += traverse.offsetTop;
				}
			}

			var maxX = minX + relTo.offsetWidth - el.offsetWidth;
			var maxY = minY + relTo.offsetHeight - el.offsetHeight;

			data.xClamp = (0, _utils.generateClamp)(minX, maxX);
			data.yClamp = (0, _utils.generateClamp)(minY, maxY);
		}

		this.opts = opts;
		this.data = data;
		this.events = {
			// mouse events
			mousedown: _events.mousedown.bind(this),
			mouseup: _events.mouseup.bind(this),

			// touch events
			touchstart: _events.touchstart.bind(this),
			touchstop: _events.touchstop.bind(this)
		};

		// add init events to handle
		this.handle.addEventListener('mousedown', this.events.mousedown, false);
		this.handle.addEventListener('touchstart', this.events.touchstart, false);
	}

	// export factory fn

	exports.default = function (el, opts) {
		return new Displace(el, opts);
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.generateClamp = generateClamp;
	exports.generateMoveFn = generateMoveFn;
	exports.isRelative = isRelative;
	function generateClamp(min, max) {
		return function (val) {
			return Math.min(Math.max(val, min), max);
		};
	}

	function generateMoveFn() {
		if (window.requestAnimationFrame) {
			return function (el, x, y) {
				window.requestAnimationFrame(function () {
					el.style.left = x + 'px';
					el.style.top = y + 'px';
				});
			};
		} else {
			return function (el, x, y) {
				el.style.left = x + 'px';
				el.style.top = y + 'px';
			};
		}
	}

	function isRelative(el) {
		return window.getComputedStyle(el).position === 'relative';
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.mousedown = mousedown;
	exports.mousemove = mousemove;
	exports.mouseup = mouseup;
	exports.touchstart = touchstart;
	exports.touchmove = touchmove;
	exports.touchstop = touchstop;

	var _utils = __webpack_require__(2);

	var move = (0, _utils.generateMoveFn)();

	// mouse events
	function mousedown(e) {
		var opts = this.opts;
		if (opts.highlightInputs) {
			// allow for selection of text in inputs/textareas
			var target = e.target.tagName.toLowerCase();
			if (target === 'input' || target === 'textarea') {
				return;
			}
		}

		var el = this.el;
		var events = this.events;

		if (typeof opts.onMouseDown === 'function') {
			opts.onMouseDown(el, e);
		}

		var wOff = e.clientX - el.offsetLeft;
		var hOff = e.clientY - el.offsetTop;

		events.mousemove = mousemove.bind(this, wOff, hOff);

		document.addEventListener('mousemove', events.mousemove, false);
		document.addEventListener('mouseup', events.mouseup, false);
	};

	function mousemove(offsetW, offsetH, e) {
		var el = this.el;
		var opts = this.opts;
		var data = this.data;

		if (typeof opts.onMouseMove === 'function') {
			opts.onMouseMove(el, e);
		}

		var x = e.clientX - offsetW;
		var y = e.clientY - offsetH;

		if (opts.constrain) {
			// clamp values if out of range
			x = data.xClamp(x);
			y = data.yClamp(y);
		}
		move(el, x, y);

		// prevent highlighting text when dragging
		e.preventDefault();
		return false;
	};

	function mouseup(e) {
		var el = this.el;
		var opts = this.opts;
		var events = this.events;

		if (typeof opts.onMouseUp === 'function') {
			opts.onMouseUp(el, e);
		}

		document.removeEventListener('mouseup', events.mouseup, false);
		document.removeEventListener('mousemove', events.mousemove, false);
	};

	// touch events
	function touchstart(e) {
		var opts = this.opts;
		if (opts.highlightInputs) {
			// allow for selection of text in inputs/textareas
			var target = e.target.tagName.toLowerCase();
			if (target === 'input' || target === 'textarea') {
				return;
			}
		}

		var el = this.el;
		var events = this.events;

		if (typeof opts.onTouchStart === 'function') {
			opts.onTouchStart(el, e);
		}

		var touch = e.targetTouches[0];
		var wOff = touch.clientX - el.offsetLeft;
		var hOff = touch.clientY - el.offsetTop;

		events.touchmove = touchmove.bind(this, wOff, hOff);

		document.addEventListener('touchmove', events.touchmove, false);
		document.addEventListener('touchend', events.touchstop, false);
		document.addEventListener('touchcancel', events.touchstop, false);
	};

	function touchmove(offsetW, offsetH, e) {
		var el = this.el;
		var opts = this.opts;
		var data = this.data;

		if (typeof opts.onTouchMove === 'function') {
			opts.onTouchMove(el, e);
		}

		var touch = e.targetTouches[0];
		var x = touch.clientX - offsetW;
		var y = touch.clientY - offsetH;

		if (opts.constrain) {
			// clamp values if out of range
			x = data.xClamp(x);
			y = data.yClamp(y);
		}
		move(el, x, y);

		// prevent highlighting text when dragging
		e.preventDefault();
		return false;
	};

	function touchstop(e) {
		var el = this.el;
		var opts = this.opts;
		var events = this.events;

		if (typeof opts.onTouchStop === 'function') {
			opts.onTouchStop(el, e);
		}

		document.removeEventListener('touchmove', events.touchmove, false);
		document.removeEventListener('touchend', events.touchstop, false);
		document.removeEventListener('touchcancel', events.touchstop, false);
	};

/***/ }
/******/ ])
});
;
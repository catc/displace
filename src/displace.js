import {
	generateClamp,
	isRelative,
	generateMoveFn
} from 'utils';

import {
	// mouse
	mousedown,
	mouseup,

	// touch
	touchstart,
	touchstop
} from 'events';

const moveFn = generateMoveFn();

const defaultOpts = {
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
	onTouchStop: null,

	customMove: null
};


class Displace {
	constructor(el, opts){
		if (!el){
			throw Error('Must include moveable element');
		}
		this.el = el;
		this.opts = opts;

		// init
		setup.call(this);
	}

	reinit(){
		this.destroy();
		setup.call(this);
	}
	destroy(){
		const events = this.events;

		this.handle.removeEventListener('mousedown', events.mousedown, false);
		document.removeEventListener('mousemove', events.mousemove, false);
		document.removeEventListener('mouseup', events.mouseup, false);

		this.handle.removeEventListener('touchstart', events.touchstart, false);
		document.removeEventListener('touchmove', events.touchmove, false);
		document.removeEventListener('touchstop', events.touchstop, false);
		document.removeEventListener('touchmove', this.events.scrollFix, { passive: false });
	}
}

function setup(){
	const el = this.el;
	const opts = this.opts || defaultOpts;
	const data = {};

	// set required css
	el.style.position = 'absolute';

	// set the handle
	this.handle = opts.handle || el;

	// generate min / max ranges
	if (opts.constrain){
		const relTo = opts.relativeTo || el.parentNode;
		
		let traverse = el;
		let minX = 0;
		let minY = 0;
		while (traverse !== relTo){
			traverse = traverse.parentNode;
			if (isRelative(traverse)){
				minX -= traverse.offsetLeft;
				minY -= traverse.offsetTop;
			}
			if (traverse === relTo){
				minX += traverse.offsetLeft;
				minY += traverse.offsetTop;
			}
		}

		const maxX = minX + relTo.offsetWidth - el.offsetWidth;
		const maxY = minY + relTo.offsetHeight - el.offsetHeight;

		data.xClamp = generateClamp(minX, maxX);
		data.yClamp = generateClamp(minY, maxY);
	}

	this.opts = opts;
	this.data = data;
	this.events = {
		// mouse events
		mousedown: mousedown.bind(this),
		mouseup: mouseup.bind(this),

		// touch events
		touchstart: touchstart.bind(this),
		touchstop: touchstop.bind(this),

		// disable scrolling on mobile while dragging
		// https://github.com/bevacqua/dragula/issues/487
		scrollFix: e => {
			if (this.isDragging){
				e.preventDefault();
			}
		}
	};

	// create move function - either use default move functionality or custom (if provided)
	this.handleMove = moveFn(this.opts.customMove);

	// add init events to handle
	this.handle.addEventListener('mousedown', this.events.mousedown, false);
	this.handle.addEventListener('touchstart', this.events.touchstart, false);

	// scroll fix for mobile
	document.addEventListener('touchmove', this.events.scrollFix, { passive: false });
}

// export factory fn
export default (el, opts) => new Displace(el, opts);
 
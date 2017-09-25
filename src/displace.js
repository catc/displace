import {
	generateClamp,
	isRelative
} from 'utils';

import {
	// mouse
	mousedown,
	mouseup,

	// touch
	touchstart,
	touchstop
} from 'events';


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
	};

	// add init events to handle
	this.handle.addEventListener('mousedown', this.events.mousedown, false);
	this.handle.addEventListener('touchstart', this.events.touchstart, false);
}

// export factory fn
export default (el, opts) => new Displace(el, opts);
 
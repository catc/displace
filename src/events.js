import {
	generateMoveFn
} from 'utils';

const move = generateMoveFn();

// mouse events
export function mousedown(e){
	const el = this.el;
	const events = this.events;
	const opts = this.opts;

	if (typeof opts.onMouseDown === 'function'){
		opts.onMouseDown(el, e);
	}

	let wOff = e.clientX - el.offsetLeft;
	let hOff = e.clientY - el.offsetTop;

	events.mousemove = mousemove.bind(this, wOff, hOff);

	document.addEventListener('mousemove', events.mousemove, false);
	document.addEventListener('mouseup', events.mouseup, false);

	// prevent highlighting text when dragging
	e.preventDefault();
	return false;
};

export function mousemove(offsetW, offsetH, e){
	const el = this.el;
	const opts = this.opts;
	const data = this.data;

	if (typeof opts.onMouseMove === 'function'){
		opts.onMouseMove(el, e);
	}

	let x = e.clientX - offsetW;
	let y = e.clientY - offsetH;

	if (opts.constrain){
		// clamp values if out of range
		x = data.xClamp(x);
		y = data.yClamp(y);
	}
	move(el, x, y);
};

export function mouseup(e){
	const el = this.el;
	const opts = this.opts;
	const events = this.events;

	if (typeof opts.onMouseUp === 'function'){
		opts.onMouseUp(el, e);
	}

	document.removeEventListener('mouseup', events.mouseup, false);
	document.removeEventListener('mousemove', events.mousemove, false);
};


// touch events
export function touchstart(e){
	const el = this.el;
	const events = this.events;
	const opts = this.opts;

	if (typeof opts.onTouchStart === 'function'){
		opts.onTouchStart(el, e);
	}

	const touch = e.targetTouches[0];
	let wOff = touch.clientX - el.offsetLeft;
	let hOff = touch.clientY - el.offsetTop;

	events.touchmove = touchmove.bind(this, wOff, hOff);

	document.addEventListener('touchmove', events.touchmove, false);
	document.addEventListener('touchend', events.touchstop, false);
	document.addEventListener('touchcancel', events.touchstop, false);

	// prevent highlighting text when dragging
	e.preventDefault();
	return false;
};

export function touchmove(offsetW, offsetH, e){
	const el = this.el;
	const opts = this.opts;
	const data = this.data;

	if (typeof opts.onTouchMove === 'function'){
		opts.onTouchMove(el, e);
	}

	const touch = e.targetTouches[0];
	let x = touch.clientX - offsetW;
	let y = touch.clientY - offsetH;

	if (opts.constrain){
		// clamp values if out of range
		x = data.xClamp(x);
		y = data.yClamp(y);
	}
	move(el, x, y);
};

export function touchstop(e){
	const el = this.el;
	const opts = this.opts;
	const events = this.events;

	if (typeof opts.onTouchStop === 'function'){
		opts.onTouchStop(el, e);
	}

	document.removeEventListener('touchmove', events.touchmove, false);
	document.removeEventListener('touchend', events.touchstop, false);
	document.removeEventListener('touchcancel', events.touchstop, false);
};
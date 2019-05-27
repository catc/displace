import displace from 'dist/displace.min.js';

const DIV_CLASS = '.custom-fn__div';
const WRAPPER_CLASS = '.custom-fn__wrapper';
const LINE_CLASS = 'custom-fn__line';

const LINE_SPACING = 50;

const wrapper = document.querySelector(WRAPPER_CLASS);

// add lines
addLines(wrapper);

// start everything
const el = document.querySelector(DIV_CLASS);
const options = {
	constrain: true,
	relativeTo: wrapper,
	customMove(el, x, y){
		const left = Math.round(x / LINE_SPACING) * LINE_SPACING;
		const top = Math.round(y / LINE_SPACING) * LINE_SPACING;
		el.style.left = left + 'px';
		el.style.top = top + 'px';
	}
};
displace(el, options);


function addLines(wrapper){
	const w = wrapper.offsetWidth;
	const h = wrapper.offsetHeight;
	const lines = document.createDocumentFragment();

	// vertical lines
	for (let i=1; i<w/LINE_SPACING -1; i++){
		const span = document.createElement('span');

		span.style.top = 0;
		span.style.left = `${i * LINE_SPACING - 1}px`;
		span.style.width = '1px';
		span.style.height = `${h-1}px`;
		span.classList.add(LINE_CLASS);

		lines.appendChild(span);
	}

	// horizontal lines
	for (let i = 1; i < h / LINE_SPACING - 1; i++) {
		const span = document.createElement('span');

		span.style.left = 0;
		span.style.top = `${i * LINE_SPACING - 1}px`;
		span.style.height = '1px';
		span.style.width = `${w-1}px`;
		span.classList.add(LINE_CLASS);

		lines.appendChild(span);
	}

	wrapper.prepend(lines);
}

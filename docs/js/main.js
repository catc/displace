import highlight from 'highlight.js';
import displace from 'dist/displace.min.js';

if (!Array.prototype.find) {
	Array.prototype.find = function(predicate) {
		var list = Object(this);
		var length = list.length >>> 0;
		var thisArg = arguments[1];
		var value;

		for (var i = 0; i < length; i++) {
			value = list[i];
			if (predicate.call(thisArg, value, i, list)) {
				return value;
			}
		}
		return undefined;
	};
}

// init all highlighted code areas
highlight.initHighlightingOnLoad();

window.displace = displace;

const code = {
	0:
`// regular instantiation
const el = document.querySelector('.moveable');
displace(el);
`,
	1:
`// constrained to parent container
const el = document.querySelector('.moveable');
const options = {
    constrain: true
};
displace(el, options);
`,
	2:
`// constrained relative to specified container
const el = document.querySelector('.moveable');
const options = {
    constrain: true,
    relativeTo: document.querySelector('.box-1')
};
displace(el, options);
`,
	3:
`// trigger events
const el = document.querySelector('.moveable');
const options = {
    constrain: true,
    relativeTo: document.body,

    onMouseDown: active,
    onTouchStart: active,
    onMouseUp: inactive,
    onTouchStop: inactive
};

function active(el){
	el.className += ' active';
}
function inactive(el){
	el.className = el.className.replace('active', '');
}

displace(el, options);
`,
	4:
`// make 'Box 3' moveable with the 'Drag me' box as the handle
const el = document.querySelector('.box-3');
const options = {
	constrain: true,
	handle: document.querySelector('.moveable'),
	relativeTo: document.querySelector('.box-1')
};
displace(el, options);
`
};

const codeEl = document.querySelector('.demo__code code');
const moveableEl = document.querySelector('.moveable');
const box3 = document.querySelector('.box-3');

const buttons = document.querySelectorAll('.demo__actions button');
[].forEach.call(buttons, (button, i) => {
	button.addEventListener('click', selectCode.bind(null, i));
});

let displaceInstance;
function selectCode(i){
	[].forEach.call(buttons, button => {
		button.className = '';
	});
	buttons[i].className = 'selected';
	let c = code[i];

	// update code
	codeEl.innerHTML = c;
	highlight.highlightBlock(codeEl);

	// reset element
	moveableEl.style.top = '50px';
	moveableEl.style.left = '50px';

	// reset box 3 (due to handle example)
	box3.style.top = '50px';
	box3.style.left = '50px';
	box3.style.position = 'relative';

	// destroy old instance of displace if exists
	if (displaceInstance && displaceInstance.destroy){
		displaceInstance.destroy();
	}

	// prepare code to actually run;
	c = c.replace(/const\b/gi, 'var');
	/*
		add return statement to store displace instance
		in order to destroy it before re-init for other demos
	*/
	c = c.replace(/displace\(/, 'return displace(');
	const fn = new Function(c);
	
	displaceInstance = fn();
}

// start first basic demo example
selectCode(0);



// magnifier example
const img = document.querySelector('#magnifier-img');
const preview = document.querySelector('.magnifier-demo__zoom-preview');
const zoomer = document.querySelector('.magnifier-demo__zoomer');
const imgDim = {};

if (img.complete){
	setupMagnifier();
} else {
	img.addEventListener('load', setupMagnifier);
}
function setupMagnifier(){
	// set preview bg
	preview.style.background = `url('${img.src}') no-repeat center center`;
	
	// set preview height
	preview.style.height = img.offsetHeight + 'px';

	const previewR = preview.offsetWidth / preview.offsetHeight;

	// set zoomer dimensions
	const zoomerW = 50;
	zoomer.style.width = zoomerW + 'px';
	zoomer.style.height = zoomerW / previewR + 'px';

	// set bg size for preview div
	const sizeRatio = img.offsetWidth / preview.offsetWidth;
	preview.style.backgroundSize = `${img.naturalWidth / sizeRatio}px ${img.naturalHeight / sizeRatio}px`;

	// cache dimensions
	imgDim.w = img.offsetWidth;
	imgDim.h = img.offsetHeight;

	// init displace
	displace(zoomer, {
		constrain: true,
		onMouseMove: updatePreview,
		onTouchMove: updatePreview
	});

	// update preview
	updatePreview(zoomer);
}

function updatePreview(el){
	const x = el.offsetLeft / (imgDim.w - el.offsetWidth) * 100;
	const y = el.offsetTop / (imgDim.h - el.offsetHeight) * 100;
	
	preview.style.backgroundPosition = `${x}% ${y}%`;
}




// sorting example
let displaceInstances;
function initSortingDemo(){
	// clear any existing displace instances
	try {
		displaceInstances.forEach(d => d.destroy());
	} catch (e){}

	const circleSize = 40;
	const positions = {};
	const progress = {};

	// setup corner coordinates
	['.top-left', '.top-right', '.bottom-left', '.bottom-right'].map(corner => {
		const el = document.querySelector(corner);
		const position = {
			top: el.offsetTop,
			left: el.offsetLeft,
			// ensure that circle is completely in the box
			bottom: el.offsetTop + el.offsetHeight - circleSize,
			right: el.offsetLeft + el.offsetWidth - circleSize
		};
		const key = corner.replace(/\./, '').replace(/-/, ' ');
		progress[key] = 0;
		return positions[key] = position;
	});
	
	// update corner progress text
	updateCorners();

	// set up circles
	displaceInstances = ['.one', '.two', '.three', '.four'].map(selector => {
		const el = document.querySelector(selector);
		el.style.left = genPos(105, 445) + 'px';
		el.style.top = genPos(105, 245) + 'px';
		el.className = el.className.replace('inactive', '');
		return displace(el, {
			onMouseDown: activeClass,
			onTouchStart: activeClass,
			onMouseUp: inactiveClass,
			onTouchStop: inactiveClass,
		});

		function genPos(min, max){
			return Math.floor(Math.random()*(max-min+1)+min);
		}
	});

	function activeClass(el){
		el.className += ' active';
	}
	function inactiveClass(el){
		el.className = el.className.replace('active', '');
		checkPosition(el);
	}

	function checkPosition(el){
		const x = el.offsetLeft;
		const y = el.offsetTop;

		Object.keys(positions).forEach(key => {
			const vals = positions[key];

			if ( between(x, vals.left, vals.right) && between(y, vals.top, vals.bottom) ){
				progress[key] = progress[key] + 1;
				updateCorners();

				// disable element
				el.className += ' inactive';
				const d = displaceInstances.find(d => {
					return d.el === el;
				});
				d.destroy();
			}
		});

		function between(val, min, max){
			return val >= min && val <= max;
		}
	}

	function updateCorners(){
		Object.keys(positions).forEach(key => {
			const query =  `[data-name='${key}']`;
			const el = document.querySelector(query);
			el.innerHTML = `Contains: <strong>${progress[key]}</strong>`;
		});
	}
}
initSortingDemo();

document.querySelector('.sorting-demo__reset-button').addEventListener('click', initSortingDemo, false);

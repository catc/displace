import 'style.scss';
import highlight from 'highlight.js';
import displace from 'dist/displace.min.js';

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
    onMouseDown: function(el){
    	el.className = el.className + ' active';
    },
    onMouseUp: function(el){
    	el.className = el.className.replace('active', '');
    }
};
displace(el, options);
`
};

const codeEl = document.querySelector('.demo__code code');
const moveableEl = document.querySelector('.moveable');

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

// start first example
selectCode(0);

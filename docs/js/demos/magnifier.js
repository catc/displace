import displace from 'dist/displace.min.js';

const img = document.querySelector('#magnifier-img');
const preview = document.querySelector('.magnifier-demo__zoom-preview');
const zoomer = document.querySelector('.magnifier-demo__zoomer');
const imgDim = {};

if (img.complete) {
	setupMagnifier();
} else {
	img.addEventListener('load', setupMagnifier);
}

function setupMagnifier() {
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

function updatePreview(el) {
	const x = el.offsetLeft / (imgDim.w - el.offsetWidth) * 100;
	const y = el.offsetTop / (imgDim.h - el.offsetHeight) * 100;

	preview.style.backgroundPosition = `${x}% ${y}%`;
}
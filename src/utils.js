
export function generateClamp(min, max){
	return function(val){
		return Math.min(Math.max(val, min), max);
	};
}

export function isRelative(el) {
	return window.getComputedStyle(el).position === 'relative';
}

export function generateMoveFn(){
	if (window.requestAnimationFrame) {
		return function(customFn){
			const move = customFn || defaultMove;

			return function (el, x, y){
				window.requestAnimationFrame(function () {
					move(el, x, y);
				});
			};
		};
	}
	return function (customFn) {
		return function (el, x, y) {
			const move = customFn || defaultMove;
			move(el, x, y);
		};
	};
}

function defaultMove(el, x, y) {
	el.style.left = x + 'px';
	el.style.top = y + 'px';
}

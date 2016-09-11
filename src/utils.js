
export function generateClamp(min, max){
	return function(val){
		return Math.min(Math.max(val, min), max);
	};
}

export function generateMoveFn(){
	if (window.requestAnimationFrame){
		return function(el, x, y){
			window.requestAnimationFrame(function(){
				el.style.left = x + 'px';
				el.style.top = y + 'px';
			});
		};
	} else {
		return function(el, x, y){
			el.style.left = x + 'px';
			el.style.top = y + 'px';
		};
	}
}

export function isRelative(el){
	return window.getComputedStyle(el).position === 'relative';
}
declare module 'displacejs' {
  export default function displace(element: HTMLElement, options?: DisplaceJSOptions): DisplaceJSObject;
}

type DisplaceJSObject = {
  // Runs setup again. Useful when divs have been moved or resized.
  reinit: () => void
  // Removes event listeners and destroys instance.
  destroy: () => void
};

type DisplaceJSOptions = {
  // Constrains element to its parent container.
  constrain?: boolean,

  // Constrains element to the specified DOM element. Requires constrain to be true.
  relativeTo?: HTMLElement,

  // Assigns a child element as the moveable handle for the parent element.
  handle?: HTMLElement,

  // Allows you to highlight text in inputs and textareas by disabling drag
  // events originating from those elements.
  highlightInputs?: boolean,

  // Function that allows you to prevent dragging from an event.
  // If the function returns true, the event will be ignored.
  ignoreFn?: DisplaceJSIgnoreFunction,

	// Interaction events.
	onMouseDown?: DisplaceJSMouseEvent,
	onMouseMove?: DisplaceJSMouseEvent,
	onMouseUp?: DisplaceJSMouseEvent,
	onTouchStart?: DisplaceJSTouchEvent,
	onTouchMove?: DisplaceJSTouchEvent,
	onTouchStop?: DisplaceJSTouchEvent,

  // Function that can be used to override how x and y are being set on the
  // displaced element on move.
	customMove?: DisplaceJSMove
};

type DisplaceJSMouseEvent = (element: HTMLElement, event: MouseEvent) => void;

type DisplaceJSTouchEvent = (element: HTMLElement, event: TouchEvent) => void;

type DisplaceJSIgnoreFunction = (event: Event) => boolean;

type DisplaceJSMove = (element: HTMLElement, xMovement: number, yMovement: number) => void;

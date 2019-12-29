declare module 'displacejs' {
  export default function displace(element: HTMLElement, options?: DisplaceJSOptions): DisplaceJSObject;
}

type DisplaceJSObject = {
  // Runs setup again. Useful when divs have been moved or resized.
  reinit: function(): void,
  // Removes event listeners and destroys instance.
  destroy: function(): void
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

	// Interaction events.
	onMouseDown?: DisplaceJSEvent,
	onMouseMove?: DisplaceJSEvent,
	onMouseUp?: DisplaceJSEvent,
	onTouchStart?: DisplaceJSEvent,
	onTouchMove?: DisplaceJSEvent,
	onTouchStop?: DisplaceJSEvent,

  // Function that can be used to override how x and y are being set on the
  // displaced element on move.
	customMove?: DisplaceJSMove
};

type DisplaceJSEvent = (element: HTMLElement) => void;

type DisplaceJSMove = (element: HTMLElement, xMovement: number, yMovement: number) => void;

const app = document.getElementById('app');

export function drag_and_drop(elementId: string) {
  const target = document.getElementById(elementId);

  if (!target || !app) return;

  const onDragStart = (event: MouseEvent | TouchEvent)  => {
    event.preventDefault();
    event.stopPropagation();
    target.style.cursor = 'grabbing';

    const e = event instanceof MouseEvent ? event : event.touches[0];

    // initial mouse/touch position
    const startPageX = e.pageX;
    const startPageY = e.pageY;

    // initial element position
    const startLeft = target.offsetLeft;
    const startTop = target.offsetTop;

    const moveAt = (pageX: number, pageY: number) => {
      // mouse delta
      const deltaX = pageX - startPageX;
      const deltaY = pageY - startPageY;

      // apply mouse delta to element position
      target.style.left = (startLeft + deltaX) + 'px';
      target.style.top = (startTop + deltaY) + 'px';
    };

    const onMouseMove = (e: MouseEvent) => {
      moveAt(e.pageX, e.pageY);
    };

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      moveAt(touch.pageX, touch.pageY);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('touchmove', onTouchMove);

    const moveInBounds = () => {
      const targetRect = target.getBoundingClientRect();

      if (targetRect.left < 0) {
        target.style.left = '0px';
      } else if (targetRect.left > app.clientWidth - target.clientWidth) {
        target.style.left = app.clientWidth - target.clientWidth + 'px';
      }

      if (targetRect.top < 0) {
        target.style.top = '0px';
      } else if (targetRect.top > app.clientHeight - target.clientHeight) {
        target.style.top = app.clientHeight - target.clientHeight + 'px';
      }
    };

    const onEnd = () => {
      target.style.cursor = 'grab';
      moveInBounds();
    };

    const onMouseUp = () => {
      onEnd();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    const onTouchUp = () => {
      onEnd();
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend',  onTouchUp);
      document.removeEventListener('touchcancel', onTouchUp);
    };

    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('touchend', onTouchUp);
    document.addEventListener('touchcancel', onTouchUp);
  };

  target?.addEventListener('mousedown', onDragStart);
  target?.addEventListener('touchstart', onDragStart);
}

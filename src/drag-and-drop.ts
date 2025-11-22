const app = document.getElementById('app');

export function drag_and_drop(elementId: string) {
  const target = document.getElementById(elementId);

  if (!target || !app) return;

  const onDragStart = (event: MouseEvent | TouchEvent)  => {
    event.preventDefault();
    event.stopPropagation();
    const e = event instanceof MouseEvent ? event : event.touches[0];

    let shiftX = e.clientX - target.getBoundingClientRect().left;
    let shiftY = e.clientY - target.getBoundingClientRect().top

    target.style.cursor = 'grabbing';

    const moveAt = (pageX: number, pageY: number) => {
      target.style.left = pageX - shiftX + 'px';
      target.style.top = pageY - shiftY + 'px';
    };

    moveAt(e.pageX, e.pageY);

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

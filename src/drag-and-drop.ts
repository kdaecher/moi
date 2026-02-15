import { layerManager } from './layer-manager';

const app = document.getElementById('app');

export function drag_and_drop(elementId: string) {
  const target = document.getElementById(elementId);

  if (!target || !app) return;
  target.style.cursor = 'grab';

  const onDragStart = (event: MouseEvent | TouchEvent)  => {
    event.preventDefault();
    event.stopPropagation();
    layerManager.bringToFront(target);
    const originalCursor = target.style.cursor;
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

    const moveInBounds = () => {
      const boundingRect = target.getBoundingClientRect();
      const parentRect = (() => {
        if (target.parentElement && target.parentElement.id !== "app") {
          return target.parentElement.getBoundingClientRect();
        }
        return {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        };
      })();

      if (boundingRect.left < 0) {
        target.style.left = `${-parentRect.left -target.clientWidth/2 + boundingRect.width/2}px`;
      } else if (boundingRect.left > app.clientWidth - boundingRect.width) {
        target.style.left = `${-parentRect.left + app.clientWidth - target.clientWidth/2 - boundingRect.width/2}px`;
      }

      if (boundingRect.top < 0) {
        target.style.top = `${-parentRect.top -target.clientHeight/2 + boundingRect.height/2}px`;
        } else if (boundingRect.top > app.clientHeight - boundingRect.height) {
        target.style.top = `${-parentRect.top + app.clientHeight - target.clientHeight/2 - boundingRect.height/2}px`;
      }
    };

    const onEnd = () => {
      target.style.cursor = originalCursor;
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

    if (event instanceof MouseEvent) {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    } else {
      document.addEventListener('touchmove', onTouchMove);
      document.addEventListener('touchend', onTouchUp);
      document.addEventListener('touchcancel', onTouchUp);
    }
  };

  target?.addEventListener('mousedown', onDragStart);
  target?.addEventListener('touchstart', onDragStart);
}

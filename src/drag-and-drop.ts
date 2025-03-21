export function DragAndDrop() {
  const name = document.getElementById('name');
  const main = document.getElementById('main');

  if (!name || !main) return;

  const onDragStart = (event: MouseEvent | TouchEvent)  => {
    const e = event instanceof MouseEvent ? event : event.touches[0];

    let shiftX = e.clientX - name.getBoundingClientRect().left;
    let shiftY = e.clientY - name.getBoundingClientRect().top;

    name.style.cursor = 'grabbing';

    const moveAt = (pageX: number, pageY: number) => {
      name.style.left = pageX - shiftX + 'px';
      name.style.top = pageY - shiftY + 'px';
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
      const nameRect = name.getBoundingClientRect();
      
      if (nameRect.left < 0) {
        name.style.left = '0px';
      } else if (nameRect.left > main.clientWidth - name.clientWidth) {
        name.style.left = main.clientWidth - name.clientWidth + 'px';
      }

      if (nameRect.top < 0) {
        name.style.top = '0px';
      } else if (nameRect.top > main.clientHeight - name.clientHeight) {
        name.style.top = main.clientHeight - name.clientHeight + 'px';
      }
    };

    const onEnd = () => {
      name.style.cursor = 'grab';
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

  name?.addEventListener('mousedown', onDragStart);
  name?.addEventListener("touchstart", onDragStart);
} 

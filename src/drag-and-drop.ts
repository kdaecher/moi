export function DragAndDrop() {
  const name = document.getElementById('name');
  const main = document.getElementById("main");

  if (!name || !main) return;

  name?.addEventListener("mousedown", (e: MouseEvent)  => {
    let shiftX = e.clientX - name.getBoundingClientRect().left;
    let shiftY = e.clientY - name.getBoundingClientRect().top;

    const moveAt = (pageX: number, pageY: number) => {
      name.style.left = pageX - shiftX + 'px';
      name.style.top = pageY - shiftY + 'px';
    }

    moveAt(e.pageX, e.pageY);

    const onMouseMove = (e: MouseEvent) => {
      moveAt(e.pageX, e.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

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

    document.addEventListener('mouseup', () => {
      moveInBounds();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseMove);
    });
  });
} 

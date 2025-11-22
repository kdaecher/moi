export function lightbox(elementId: string) {
  const element = document.getElementById(elementId);
  if (!element) return;

  // clone element to remove event listeners
  const originalElement = element;
  const clonedElement = element.cloneNode(true) as HTMLElement;
  if (element instanceof HTMLCanvasElement && clonedElement instanceof HTMLCanvasElement) {
    clonedElement.width = element.width;
    clonedElement.height = element.height;
    clonedElement.style.cssText = element.style.cssText;
    const ctx = clonedElement.getContext('2d');
    if (ctx) {
      ctx.drawImage(element, 0, 0);
    }
  }
  element.parentNode?.replaceChild(clonedElement, element);
  const workingElement = clonedElement;

  const originalPosition = workingElement.style.position;
  const originalZIndex = workingElement.style.zIndex;
  const originalTransition = workingElement.style.transition;
  const originalCursor = workingElement.style.cursor;
  const originalTransform = workingElement.style.transform;
  const originalLeft = workingElement.style.left;
  const originalTop = workingElement.style.top;
  const originalWidth = workingElement.style.width;
  const originalHeight = workingElement.style.height;
  const rect = workingElement.getBoundingClientRect();
  const computedStyle = window.getComputedStyle(workingElement);
  const transform = computedStyle.transform;
  let originalRotation = 0;
  if (transform && transform !== 'none') {
    const values = transform.split('(')[1].split(')')[0].split(',');
    const a = parseFloat(values[0]);
    const b = parseFloat(values[1]);
    originalRotation = Math.atan2(b, a) * (180 / Math.PI);
  }

  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
  overlay.style.zIndex = '0';
  overlay.style.transition = 'all 0.3s ease';
  document.body.appendChild(overlay);

  workingElement.style.position = 'fixed';
  workingElement.style.zIndex = '1001';
  workingElement.style.transition = 'all 0.3s ease';

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      overlay.style.zIndex = '1000';
      const maxWidth = window.innerWidth * 0.9;
      const maxHeight = window.innerHeight * 0.9;
      const aspectRatio = rect.width / rect.height;
      
      let newWidth = maxWidth;
      let newHeight = newWidth / aspectRatio;
      
      if (newHeight > maxHeight) {
        newHeight = maxHeight;
        newWidth = newHeight * aspectRatio;
      }
      
      workingElement.style.left = `${(window.innerWidth - newWidth) / 2}px`;
      workingElement.style.top = `${(window.innerHeight - newHeight) / 2}px`;
      workingElement.style.width = `${newWidth}px`;
      workingElement.style.height = `${newHeight}px`;
      workingElement.style.transform = 'rotate(0deg)';
    });
  });

  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  };

  const closeLightbox = () => {
    document.removeEventListener('keydown', handleEscape);
    overlay.onclick = null;
    
    workingElement.style.left = `${rect.left}px`;
    workingElement.style.top = `${rect.top}px`;
    workingElement.style.width = `${rect.width}px`;
    workingElement.style.height = `${rect.height}px`;
    workingElement.style.transform = `rotate(${originalRotation}deg)`;
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    
    setTimeout(() => {
      workingElement.style.position = originalPosition;
      workingElement.style.zIndex = originalZIndex;
      workingElement.style.transition = originalTransition;
      workingElement.style.cursor = originalCursor;
      workingElement.style.transform = originalTransform;
      workingElement.style.left = originalLeft;
      workingElement.style.top = originalTop;
      workingElement.style.width = originalWidth;
      workingElement.style.height = originalHeight;
      
      // restore original element
      workingElement.parentNode?.replaceChild(originalElement, workingElement);
      document.body.removeChild(overlay);
    }, 300);
  };

  overlay.onclick = closeLightbox;
  document.addEventListener('keydown', handleEscape);
}
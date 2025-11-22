import { layerManager } from './layer-manager';

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

  const computedStyle = window.getComputedStyle(workingElement);
  
  const widthBeforeTransform = parseFloat(computedStyle.width);
  const heightBeforeTransform = parseFloat(computedStyle.height);
  const rectAfterTransform = workingElement.getBoundingClientRect();
  const centerX = rectAfterTransform.left + rectAfterTransform.width / 2;
  const centerY = rectAfterTransform.top + rectAfterTransform.height / 2;
  const leftBeforeTransform = centerX - widthBeforeTransform / 2;
  const topBeforeTransform = centerY - heightBeforeTransform / 2;
  
  const transform = computedStyle.transform;
  const originalRotation = transform && transform !== 'none' ? 
    parseTransform(transform).rotation : 0;

  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
  layerManager.register(overlay);
  overlay.style.transition = 'all 0.3s ease';
  document.body.appendChild(overlay);

  workingElement.style.cursor = 'default';
  workingElement.style.position = 'fixed';
  layerManager.set(workingElement, layerManager.getMaxZIndex() + 2);
  workingElement.style.transition = 'all 0.3s ease';

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      layerManager.set(overlay, layerManager.getMaxZIndex() - 1);
      const maxWidth = window.innerWidth * 0.9;
      const maxHeight = window.innerHeight * 0.9;
      const aspectRatio = widthBeforeTransform / heightBeforeTransform;

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

    workingElement.style.left = `${leftBeforeTransform}px`;
    workingElement.style.top = `${topBeforeTransform}px`;
    workingElement.style.width = `${widthBeforeTransform}px`;
    workingElement.style.height = `${heightBeforeTransform}px`;
    workingElement.style.transform = `rotate(${originalRotation}deg)`;
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    
    setTimeout(() => {
      // restore original element
      workingElement.parentNode?.replaceChild(originalElement, workingElement);
      document.body.removeChild(overlay);
    }, 300);
  };

  overlay.onclick = closeLightbox;
  document.addEventListener('keydown', handleEscape);
}

const parseTransform = (transform: string) => {
  const values = transform.split('(')[1].split(')')[0].split(',');
  const a = parseFloat(values[0]);
  const b = parseFloat(values[1]);
  const rotation = Math.atan2(b, a) * (180 / Math.PI);
  return { rotation };
};

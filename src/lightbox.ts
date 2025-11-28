import { layerManager } from './layer-manager';

const app = document.getElementById('app');

export function lightbox(elementId: string) {
  const element = document.getElementById(elementId);
  if (!element || !app) return;
  const originalParent = element.parentNode || app;
  const originalElement = element;

  // save original dimensions and position
  const computedStyle = window.getComputedStyle(originalElement);
  const widthBeforeTransform = parseFloat(computedStyle.width);
  const heightBeforeTransform = parseFloat(computedStyle.height);
  const rectAfterTransform = originalElement.getBoundingClientRect();
  const centerX = rectAfterTransform.left + rectAfterTransform.width / 2;
  const centerY = rectAfterTransform.top + rectAfterTransform.height / 2;
  const leftBeforeTransform = centerX - widthBeforeTransform / 2;
  const topBeforeTransform = centerY - heightBeforeTransform / 2;
  const originalTransform = computedStyle.transform;

  // clone element to remove event listeners and remove from parent
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
  clonedElement.style.left = `${leftBeforeTransform}px`;
  clonedElement.style.top = `${topBeforeTransform}px`;
  clonedElement.style.width = `${widthBeforeTransform}px`;
  clonedElement.style.height = `${heightBeforeTransform}px`;
  clonedElement.style.transform = originalTransform;
  clonedElement.style.cursor = 'default';
  clonedElement.style.position = 'fixed';
  layerManager.set(clonedElement, layerManager.getMaxZIndex() + 2);
  clonedElement.style.transition = 'all 0.3s ease';

  // swap original for cloned
  app.appendChild(clonedElement);
  originalParent?.removeChild(element);

  // lightbox overlay
  const overlay = document.createElement('div');
  overlay.id = 'lightbox-overlay';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
  layerManager.register(overlay);
  overlay.style.transition = 'all 0.3s ease';
  app.appendChild(overlay);

  // animate in
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

      clonedElement.style.left = `${(window.innerWidth - newWidth) / 2}px`;
      clonedElement.style.top = `${(window.innerHeight - newHeight) / 2}px`;
      clonedElement.style.width = `${newWidth}px`;
      clonedElement.style.height = `${newHeight}px`;
      clonedElement.style.transform = 'rotate(0deg)';
    });
  });
  
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  };
  document.addEventListener('keydown', handleEscape);

  // animate out
  const closeLightbox = () => {
    document.removeEventListener('keydown', handleEscape);
    overlay.onclick = null;

    clonedElement.style.left = `${leftBeforeTransform}px`;
    clonedElement.style.top = `${topBeforeTransform}px`;
    clonedElement.style.width = `${widthBeforeTransform}px`;
    clonedElement.style.height = `${heightBeforeTransform}px`;
    clonedElement.style.transform = originalTransform;
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    
    setTimeout(() => {
      // restore original element
      originalParent?.appendChild(originalElement);
      app.removeChild(clonedElement);
      app.removeChild(overlay);
      layerManager.remove(overlay);
    }, 300);
  };
  overlay.onclick = closeLightbox;
}

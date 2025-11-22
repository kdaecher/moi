const BASE = 0;

class LayerManager {
  private static instance: LayerManager;
  private layerStack: Map<HTMLElement, number> = new Map();
  private currentMaxZIndex: number = BASE;

  private constructor() {}

  public static getInstance(): LayerManager {
    if (!LayerManager.instance) {
      LayerManager.instance = new LayerManager();
    }
    return LayerManager.instance;
  }

  public register(element: HTMLElement, layer?: number): void {
    if (layer === undefined) {
      element.style.zIndex = BASE.toString();
      this.layerStack.set(element, BASE);
      return;
    }
    element.style.zIndex = layer.toString();
    this.layerStack.set(element, layer);
    this.currentMaxZIndex = Math.max(this.currentMaxZIndex, layer);
  }

  public set(element: HTMLElement, layer: number): void {
    this.register(element, layer);
  }

  public get(element: HTMLElement): number | undefined {
    return this.layerStack.get(element);
  }

  public bringToFront(element: HTMLElement): void {
    this.currentMaxZIndex++;
    element.style.zIndex = this.currentMaxZIndex.toString();
    this.layerStack.set(element, this.currentMaxZIndex);
  }

  public sendToBack(element: HTMLElement): void {
    element.style.zIndex = BASE.toString();
    this.layerStack.set(element, BASE);
  }

  public remove(element: HTMLElement): void {
    this.layerStack.delete(element);
    element.style.zIndex = '';
  }

  public reset(): void {
    this.layerStack.forEach((_, element) => {
      element.style.zIndex = '';
    });
    this.layerStack.clear();
    this.currentMaxZIndex = BASE;
  }

  public getMaxZIndex(): number {
    return this.currentMaxZIndex;
  }
}

export const layerManager = LayerManager.getInstance();

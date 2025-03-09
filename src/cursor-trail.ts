class Dot {
  x: number | null = null;
  y: number | null = null;
  #node: HTMLElement | null = null;

  constructor(x: number | null, y: number | null) {
    this.x = x;
    this.y = y;

    const node = document.createElement('div');
    // node.classList.add('cursor-trail');
    node.style.position = 'absolute';
    node.style.width = '6px';
    node.style.height = '6px';
    node.style.borderRadius = '50%';
    node.style.background = 'black';
    document.body.appendChild(node);

    this.#node = node;
  }

  draw() {
    if (this.#node === null || this.x === null || this.y === null) return;

    this.#node.style.left = `${this.x}px`;
    this.#node.style.top = `${this.y}px`;
  }
}

const NUM_DOTS = 80;

export class CursorTrail {
  #x: number | null = null;
  #y: number | null = null;
  #dots: Dot[] = [];

  constructor() {
    const style = document.createElement('style');
    style.textContent = `
      .cursor-trail::after {
        content: '✍︎';
      }
    `;
    document.head.appendChild(style);

    for (let i = 0; i < NUM_DOTS; i++) {
      const d = new Dot(null, null);
      this.#dots.push(d);
    }
  }

  setPosition(x: number, y: number) {
    this.#x = x;
    this.#y = y;
  }

  #draw() {
    if (this.#x === null || this.#y === null) return;

    let [x, y] = [this.#x, this.#y];

    this.#dots.forEach((dot, i) => {
      const nextDot = this.#dots[i + 1] ?? this.#dots[0];
      dot.x = x + 10;
      dot.y = y + 10;
      dot.draw();

      x += ((nextDot.x ?? 0) - (dot.x ?? 0)) * 0.6;
      y += ((nextDot.y ?? 0) - (dot.y ?? 0)) * 0.6;
    });
  }

  animate() {
    this.#draw();
    requestAnimationFrame(this.animate.bind(this));
  }
}
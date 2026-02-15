import rock from './assets/rock.png';

import { drag_and_drop } from './drag-and-drop';
import { blurhash_image } from './blurhash-image';
import { lightbox } from './lightbox';
import { ThemeManager } from './theme-manager';
import { layerManager } from './layer-manager';

const themeManager = new ThemeManager();

/** light beam */
const beam = document.querySelector<SVGElement>('#beam')!;
themeManager.on('themeChange', (theme) => {
  if (theme.name === 'light') {
    beam.style.display = 'none';
  } else {
    beam.style.display = 'block';
  }
});

/** lamp */
const lamp = document.querySelector<SVGElement>('#lamp')!;
lamp.style.cursor = 'pointer';
lamp.addEventListener('click', (e) => {
  e.stopPropagation();
  themeManager.toggleTheme();
});

/** info container */
const info = document.querySelector<HTMLDivElement>('#info')!;
layerManager.register(info, 1);

/** name  */
const name = document.querySelector<HTMLDivElement>('#name')!;
name.addEventListener('click', () => {
  const details = document.querySelector<HTMLDivElement>('#details');
  if (details) {
    const displayState = window.getComputedStyle(details).display;
    details.style.display = displayState === 'none' ? 'flex' : 'none';
  }
});

/** contact info: TODO */
const contact = document.querySelector<HTMLDivElement>('#contact')!;
const email = document.createElement('a');
email.textContent = 'karsondaecher @ gmail.com';
email.href = 'mailto:karsondaecher@gmail.com';
email.style.display = 'flex'
email.style.color = 'var(--text-color)';
email.style.textDecoration = 'none';
contact.appendChild(email);

/** image stack */
const imageContainer = document.querySelector<HTMLDivElement>('#image-container')!;

const image1 = blurhash_image('IMG_7459.jpg', 'U44dfYO91Y,wayj[a}a{1Yw#}HFWWCfPoKjb');
image1.id = 'image1';
image1.style.width = '17%';
image1.style.position = 'absolute';
image1.style.top = '17%';
image1.style.left = '30%';
image1.style.transform = 'rotateX(77deg) rotateZ(270.0deg)';
image1.style.pointerEvents = 'fill';
imageContainer.appendChild(image1);
drag_and_drop('image1');
image1.style.cursor = 'pointer';

const image2 = blurhash_image('cats.jpeg', 'L6F=gfys02^,01^ORR0g004.-=w[');
image2.id = 'image2';
image2.style.width = '17%';
image2.style.position = 'absolute';
image2.style.top = '7%';
image2.style.left = '40%';
image2.style.transform = 'rotateX(77deg) rotateZ(280.5deg)';
image2.style.pointerEvents = 'fill';
imageContainer.appendChild(image2);
drag_and_drop('image2');
image2.style.cursor = 'pointer';

const image3 = blurhash_image('butterflies.jpeg', 'T8AeXd^Z~q004p4o?a?a-:M|M{Rj');
image3.id = 'image3';
image3.style.width = '17%';
image3.style.position = 'absolute';
image3.style.top = '12%';
image3.style.left = '35%';
image3.style.transform = 'rotateX(77deg) rotateZ(276.5deg)';
image3.style.pointerEvents = 'fill';
imageContainer.appendChild(image3);
drag_and_drop('image3');
image3.style.cursor = 'pointer';

const num_images = 3;
for (let i = 1; i <= num_images; i++) {
  const imageEl = document.querySelector<HTMLCanvasElement>(`#image${i}`);
  if (!imageEl) continue;

  imageEl.addEventListener('click', () => {
    layerManager.bringToFront(imageEl);
  });

  imageEl.ondblclick = () => {
    lightbox(`image${i}`);
  }
}

const rockSVG = document.getElementById('rock')!;
rockSVG.innerHTML = `
  <style>
    .image-mapper-shape {
      fill: rgba(0, 0, 0, 0);
      pointer-events: fill;
      cursor: inherit;
    }
    .image-mapper-link {
      cursor: inherit;
    }
  </style>
  <image xlink:href="${rock}" style="width: 2125px;"></image>
  <a xlink:href="#" target="---" xlink:title="" class="image-mapper-link">
    <g>
      <polygon class="image-mapper-shape" data-index="1" points="1029.2 62.5594 754.748 187.678 318.851 478.276 -2.01804 954.535 40.3609 1142.21 149.335 1333.93 262.346 1481.24 421.771 1578.11 738.604 1660.85 839.506 1654.8 1075.62 1707.27 1226.97 1757.72 1481.24 1749.64 1586.18 1715.34 1731.48 1638.65 1874.76 1578.11 1965.57 1491.33 2082.62 1428.77 2080.6 1394.47 2112.89 1370.25 2100.78 1275.4 2102.8 1204.77 2060.42 1091.76 2028.13 1025.17 1965.57 928.3 1903.02 823.362 1674.98 546.89 1658.83 452.042 1594.25 365.266 1493.35 226.021 1426.76 151.353 1394.47 98.8841 1188.63 -8.07218"></polygon>
    </g>
  </a>
`
rockSVG.style.width = '5%';
rockSVG.style.position = 'absolute';
rockSVG.style.top = '40%';
rockSVG.style.left = '40%';
rockSVG.style.userSelect = 'none';
rockSVG.style.pointerEvents = 'none';
imageContainer.appendChild(rockSVG);
drag_and_drop('rock');

rockSVG.addEventListener('click', () => {
  layerManager.bringToFront(rockSVG);
});

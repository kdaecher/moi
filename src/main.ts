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

const rockImage = document.createElement('img');
rockImage.id = 'rock';
rockImage.src = rock;
rockImage.style.width = '5%';
rockImage.style.position = 'absolute';
rockImage.style.top = '40%';
rockImage.style.left = '40%';
imageContainer.appendChild(rockImage);
drag_and_drop('rock');

rockImage.addEventListener('click', () => {
  layerManager.bringToFront(rockImage);
});

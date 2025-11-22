import rock from './assets/rock.png';
import lamp from './assets/lamp_3.svg';
import light from './assets/light.svg';

import { drag_and_drop } from './drag-and-drop';
import { blurhash_image } from './blurhash-image';
import { ThemeManager } from './theme-manager';

const themeManager = new ThemeManager();

const app = document.querySelector<HTMLDivElement>('#app')!;
app.style.display = 'flex';
app.style.height = '100vh';
app.style.width = '100vw';

/** lamp container */
const lampContainer = document.createElement('div');
lampContainer.style.width = '418px';
lampContainer.style.height = '215px';
lampContainer.style.position = 'absolute';
lampContainer.style.top = '10%';
lampContainer.style.left = '27%';
lampContainer.style.position = "relative";
app.appendChild(lampContainer);

/** light */
const lightImage = document.createElement('img');
lightImage.src = light;
lightImage.style.width = '304px';
lightImage.style.position = 'absolute';
lightImage.style.bottom = '0';
lightImage.style.right = 'calc(418px - 304px)';
lightImage.style.display = themeManager.get().name === 'light' ? 'none' : 'block';
lampContainer.appendChild(lightImage);

themeManager.on('themeChange', (theme) => {
  if (theme.name === 'light') {
    lightImage.style.display = 'none';
  } else {
    lightImage.style.display = 'block';
  }
});

/** lamp */
const lampImage = document.createElement('img');
lampImage.src = lamp;
lampImage.style.width = '200px';
lampImage.style.position = 'absolute';
lampImage.style.bottom = '0';
lampImage.style.right = '0';
lampImage.style.cursor = 'pointer';
lampImage.style.zIndex = '1';
lampImage.onclick = () => {
  themeManager.toggleTheme();
};
lampContainer.appendChild(lampImage);

/** info container */
const info = document.querySelector<HTMLDivElement>('#info')!;
info.style.zIndex = '2';

/** name  */
const name = document.querySelector<HTMLDivElement>('#name')!;
name.addEventListener('click', () => {
  const details = document.getElementById('details');
  if (details) {
    details.style.display = details.style.display === 'none' ? 'flex' : 'none';
  }
});

const nameHover = document.createElement('style');
nameHover.textContent = `
  #name:hover {
    color: var(--accent-color);
    text-decoration: underline;
  }
`;
document.head.appendChild(nameHover);

/** contact info */
const details = document.createElement('div');
details.id = 'details';
details.style.display = 'none';
details.style.fontSize = '14px';
details.style.fontFamily = 'serif';
details.style.flexDirection = 'column';
details.style.marginTop = '8px';
details.style.marginLeft = '1px';
details.style.gap = '4px';
info.appendChild(details);

const email = document.createElement('a');
email.textContent = 'karsondaecher at gmail.com';
email.href = 'mailto:karsondaecher@gmail.com';
email.style.display = 'flex'
email.style.color = 'var(--text-color)';
email.style.textDecoration = 'none';
details.appendChild(email);

/** image gallery */
const image1 = blurhash_image('IMG_7459.jpg', 'U44dfYO91Y,wayj[a}a{1Yw#}HFWWCfPoKjb');
image1.id = 'image1';
image1.style.position = 'absolute';
image1.style.top = '67%';
image1.style.left = '18%';
image1.style.rotate = '-15deg';
image1.style.cursor = 'pointer';
app.appendChild(image1);

const image2 = blurhash_image('cats.jpeg', 'L6F=gfys02^,01^ORR0g004.-=w[');
image2.id = 'image2';
image2.style.position = 'absolute';
image2.style.top = '53%';
image2.style.left = '20%';
image2.style.rotate = '10deg';
image2.style.cursor = 'pointer';
app.appendChild(image2);

const image3 = blurhash_image('butterflies.jpeg', 'T8AeXd^Z~q004p4o?a?a-:M|M{Rj');
image3.id = 'image3';
image3.style.position = 'absolute';
image3.style.top = '64%';
image3.style.left = '25%';
image3.style.rotate = '5deg';
image3.style.cursor = 'pointer';
app.appendChild(image3);

const rockImage = document.createElement('img');
rockImage.id = 'rock-image';
rockImage.src = rock;
rockImage.style.width = '100px';
rockImage.style.height = '100px';
rockImage.style.position = 'absolute';
rockImage.style.top = '65%';
rockImage.style.left = '20%';
app.appendChild(rockImage);
drag_and_drop('rock-image');

const num_images = 3;
for (let i = 1; i <= num_images; i++) {
  const imageEl = document.getElementById(`image${i}`);
  if (imageEl) {
    imageEl.onclick = () => {
      move_image_to_front(`image${i}`);
    }
  }
}

let image_stack_z_index = 1;
function move_image_to_front(image_id: string) {
  const img = document.getElementById(image_id);
  if (img) {
    img.style.zIndex = String(image_stack_z_index++);
  }
  const rock = document.getElementById('rock-image');
  if (rock) {
    rock.style.zIndex = String(image_stack_z_index + 1);
  }
}
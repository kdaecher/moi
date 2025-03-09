import { decode } from "blurhash";

const main = document.createElement('div');
main.style.display = 'flex';
main.style.height = '100vh';
main.style.width = '100vw';
document.querySelector<HTMLDivElement>('#app')!.appendChild(main);


const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

const blurhash = decode("U44dfYO91Y,wayj[a}a{1Yw#}HFWWCfPoKjb", 100, 100);
canvas.width = 100;
canvas.height = 100;
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.objectFit = 'cover';
if (ctx) {
  const imageData = ctx.createImageData(100, 100);
  imageData.data.set(blurhash);
  ctx.putImageData(imageData, 0, 0);
  main.appendChild(canvas);
}

const loadImageDecode = async (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (...args) => reject(args);
    img.src = src;
  });

const getImageDataDecode = (image: HTMLImageElement)   => {
  if (ctx) {
    canvas.width = image.width;
    canvas.height = image.height;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.objectFit = 'cover';
    ctx.drawImage(image, 0, 0);
    return ctx.getImageData(0, 0, image.width, image.height);
  }
};


loadImageDecode('IMG_7459.jpg').then(image => {
  getImageDataDecode(image);
});

const div = document.createElement('div');
main.appendChild(div);
div.style.position = 'absolute';
div.style.top = '20%';
div.style.left = '40%';
div.style.color = 'white';
div.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
div.style.cursor = 'pointer';
div.appendChild(document.createTextNode("karson daecher"));


const cyclePosition = () => {
  const padding = 20;
  const top = Math.random() * (main.clientHeight - div.clientHeight - padding) + padding;
  const left = Math.random() * (main.clientWidth - div.clientWidth - padding) + padding;
  div.style.top = `${top}px`;
  div.style.left = `${left}px`;
}


div.onclick = () => {
  cyclePosition();
};

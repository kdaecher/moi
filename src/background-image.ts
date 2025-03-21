import { decode } from "blurhash";

export function BackgroundImage() {
  const main = document.getElementById("main");

  if (!main) return;

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
}
import { BackgroundImage } from './background-image';
import { DragAndDrop } from './drag-and-drop';

const main = document.createElement('div');
main.id = "main";
main.style.display = 'flex';
main.style.height = '100vh';
main.style.width = '100vw';
document.querySelector<HTMLDivElement>('#app')!.appendChild(main);

const div = document.createElement('div');
main.appendChild(div);
div.id = "name";
div.style.position = 'absolute';
div.style.top = '20%';
div.style.left = '40%';
div.style.color = 'white';
div.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
div.style.padding = '6px';
div.style.cursor = 'pointer';
div.style.whiteSpace = "nowrap";
div.appendChild(document.createTextNode("karson daecher"));

BackgroundImage();
DragAndDrop();

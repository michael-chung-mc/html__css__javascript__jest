const container = document.querySelector('#container');

const content = document.createElement('div');
content.classList.add('content');
content.textContent = 'This is the glorious text-content!';

const red = document.createElement('p');
red.textContent = "Hey I'm red!";
red.style.cssText = "color: red";

const blue = document.createElement("h3");
blue.textContent = "I'm a blue h3!";
blue.style.cssText = "color: blue";

const blackPink = document.createElement("div");
const blackPinkH = document.createElement("h1");
blackPinkH.textContent = "I'm in a div";
const blackPinkP = document.createElement("p");
blackPinkP.textContent = "ME TOO!"
blackPink.style.cssText = "border-style: solid; border-color: black; background-color: pink;";
blackPink.appendChild(blackPinkH);
blackPink.appendChild(blackPinkP);


container.appendChild(content);
container.appendChild(red);
container.appendChild(blue);
container.appendChild(blackPink);
import "./style.scss";

//Selecting HTML elements through the DOM

const boxContainer = document.querySelector<HTMLElement>(".box");
console.log(boxContainer);
const squareBtn =
  document.querySelectorAll<HTMLButtonElement>(".box__row-btn");

console.log(squareBtn);

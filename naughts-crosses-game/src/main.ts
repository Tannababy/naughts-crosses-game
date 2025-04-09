import "./style.scss";

//Selecting HTML elements through the DOM
const tiles = document.querySelectorAll<HTMLDivElement>(".box__row-tile");

let currentPlayer: string = "X";

const handleClick = (event: Event) => {
  const target = event.currentTarget as HTMLDivElement;

  // to check if tile is filled
  if (target.innerText !== "") {
    return;
  }

  target.innerText = currentPlayer;
};

tiles.forEach((tile) => tile.addEventListener("click", handleClick));

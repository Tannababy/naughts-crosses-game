import "./style.scss";

//Selecting HTML elements through the DOM
const tiles = document.querySelectorAll<HTMLDivElement>(".box__row-tile");

let currentPlayer: string = "X";

const handleClick = (event: Event) => {
  const target = event.currentTarget as HTMLDivElement;

  // check if tile is filled
  if (target.innerText !== "") {
    return;
  }

  // fill tile with current player
  target.innerText = currentPlayer;

  // to switch players
  currentPlayer = currentPlayer === "X" ? "0" : "X";
};

tiles.forEach((tile) => tile.addEventListener("click", handleClick));

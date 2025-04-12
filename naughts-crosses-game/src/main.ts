import "./style.scss";

//Selecting HTML elements through the DOM
const tiles = document.querySelectorAll<HTMLDivElement>(".board__tile");

let currentPlayer: string = "X";

const handleClicks = (event: Event) => {
    const target = event.currentTarget as HTMLDivElement;
    console.log(target.id);

  // check if tile is filled
  if (target.innerText !== "") {
    return;
  }

  // fill tile with current player
  target.innerText = currentPlayer;

  // to switch players
  currentPlayer = currentPlayer === "X" ? "0" : "X";
};

// const checkIfPlayerWon = (event: Event) => {

// }

tiles.forEach((tile) => tile.addEventListener("click", handleClicks));

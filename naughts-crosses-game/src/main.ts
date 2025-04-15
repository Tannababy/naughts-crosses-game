import "./style.scss";

//Selecting HTML elements through the DOM
const tiles = document.querySelectorAll<HTMLDivElement>(".board__tile");

let currentPlayer: string = 'X';

type boardState = {
    [key: string]: string | null;
}
const board: boardState = {
  upperLeft: " ",
  upperCentre: " ",
  upperRight: " ",
  middleLeft: " ",
  middleCentre: " ",
  middleRight: " ",
  lowerLeft: " ",
  lowerCentre: " ",
  lowerRight: " ",
};

const handleClicks = (event: Event) => {
    const target = event.currentTarget as HTMLDivElement;
    const tileLocation = target.id;
    
    // check if tile is filled
    if (target.innerText !== "") {
        return;
    }

    // fill tile with current player
    target.innerText = currentPlayer;

    // to update board
    board[tileLocation] = currentPlayer;

    // switch players
    currentPlayer = currentPlayer === "X" ? "O" : "X";

};



// const checkIfPlayerWon = () => { }



tiles.forEach((tile) => tile.addEventListener("click", handleClicks));

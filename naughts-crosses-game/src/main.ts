import "./style.scss";

//Selecting HTML elements through the DOM
const tiles = document.querySelectorAll<HTMLDivElement>(".board__tile");
const scoreCountX = document.querySelector<HTMLSpanElement>("#scoreX");
const scoreCountY = document.querySelector<HTMLSpanElement>("#scoreY");
const restartBtn = document.querySelector<HTMLButtonElement>(
  ".header__restartBtn"
);

if (!tiles || !restartBtn) {
  throw new Error(`Some elements can not be found`);
}

let currentPlayer: string = "X";

type boardState = {
  [key: string]: string | null;
};
const board: boardState = {
  upperLeft: " ",
  upperCenter: " ",
  upperRight: " ",
  middleLeft: " ",
  middleCenter: " ",
  middleRight: " ",
  lowerLeft: " ",
  lowerCenter: " ",
  lowerRight: " ",
};

const resetBoard = () => {
  tiles.forEach((tile) => {
      if (tile.innerText !== '') {
          tile.innerText = '';
      }
  });
    for (const key in board) {
      board[key] = null;
    }
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

  // to update board obj
  board[tileLocation] = currentPlayer;

  // setTimeout(() => checkIfPlayerWon(currentPlayer), 1);
  checkIfPlayerWon(currentPlayer);

  // switch players
  currentPlayer = currentPlayer === "X" ? "O" : "X";
};

const alertPlayerWin = (currentPlayer: string) => {
  setTimeout(() => alert(`Player ${currentPlayer} has Won!🏆`), 500);
};

// const strikeThrough = (tile: string) => {

// }

const checkIfPlayerWon = (currentPlayer: string) => {
  // let isWinner: boolean = false;
  if (
    board.upperLeft === currentPlayer &&
    board.upperCenter === currentPlayer &&
    board.upperRight === currentPlayer
  ) {
    alertPlayerWin(currentPlayer);
  }
  if (
    board.middleLeft === currentPlayer &&
    board.middleCenter === currentPlayer &&
    board.middleRight === currentPlayer
  ) {
    alertPlayerWin(currentPlayer);
  }
  if (
    board.lowerLeft === currentPlayer &&
    board.lowerCenter === currentPlayer &&
    board.lowerRight === currentPlayer
  ) {
    alertPlayerWin(currentPlayer);
  }
};

tiles.forEach((tile) => tile.addEventListener("click", handleClicks));
restartBtn.addEventListener("click", resetBoard);
// tiles.forEach((tile) => tile.addEventListener("click",() => checkIfPlayerWon(currentPlayer))

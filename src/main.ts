import "./style.scss";
import "./media-queries.scss";

//Selecting HTML elements through the DOM
const tiles = document.querySelectorAll<HTMLDivElement>(".board__tile");
const scoreXSpan = document.querySelector<HTMLSpanElement>("#scoreX");
const score0Span = document.querySelector<HTMLSpanElement>("#score0");
const restartBtn = document.querySelector<HTMLButtonElement>(
  ".header__BtnContainer-restartBtn"
);
const clearScoresBtn = document.querySelector<HTMLButtonElement>(
  ".header__BtnContainer-clearScoresBtn"
);

let scoreCountX = 0; // initialise score count
let scoreCount0 = 0; // initialise score count
let turnCount = 0; // to track number of turns each player makes
let shouldResetBoard: boolean;

if (!tiles || !restartBtn || !score0Span || !scoreXSpan || !clearScoresBtn) {
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

const handleClicks = (event: Event) => {
  if (shouldResetBoard) {
    return;
  }

  const target = event.currentTarget as HTMLDivElement;
  const tileLocation = target.id;

  // check if tile is filled
  if (target.innerText !== "") {
    return;
  }

  // fill tile with current player
  target.innerText = currentPlayer;
  turnCount++;

  // to update board obj
  board[tileLocation] = currentPlayer;

  if (checkIfPlayerWon(currentPlayer)) {
    updateScoreboard(scoreCountX, scoreCount0);
    setTimeout(() => resetBoard(), 500);
    return;
  }

  // switch players
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  checkIfDraw();
};

const alertPlayerWin = (currentPlayer: string) => {
  setTimeout(() => alert(`Player ${currentPlayer} has WON! 🏆`), 500);
};

const updateScoreboard = (scoreX: number, score0: number) => {
  scoreXSpan.innerText = `X: ${scoreX}`;
  score0Span.innerText = `0: ${score0}`;
};

const checkIfPlayerWon = (currentPlayer: string): boolean => {
  // for horizontal wins
  if (
    board.upperLeft === currentPlayer &&
    board.upperCenter === currentPlayer &&
    board.upperRight === currentPlayer
  ) {
    alertPlayerWin(currentPlayer);
    currentPlayer === "X" ? scoreCountX++ : scoreCount0++;
    return true;
  }
  if (
    board.middleLeft === currentPlayer &&
    board.middleCenter === currentPlayer &&
    board.middleRight === currentPlayer
  ) {
    alertPlayerWin(currentPlayer);
    currentPlayer === "X" ? scoreCountX++ : scoreCount0++;
    return true;
  }
  if (
    board.lowerLeft === currentPlayer &&
    board.lowerCenter === currentPlayer &&
    board.lowerRight === currentPlayer
  ) {
    alertPlayerWin(currentPlayer);
    currentPlayer === "X" ? scoreCountX++ : scoreCount0++;
    return true;
  }
  // for diagonal wins
  if (
    board.upperLeft === currentPlayer &&
    board.middleCenter === currentPlayer &&
    board.lowerRight === currentPlayer
  ) {
    alertPlayerWin(currentPlayer);
    currentPlayer === "X" ? scoreCountX++ : scoreCount0++;
    return true;
  }
  if (
    board.upperRight === currentPlayer &&
    board.middleCenter === currentPlayer &&
    board.lowerLeft === currentPlayer
  ) {
    alertPlayerWin(currentPlayer);
    currentPlayer === "X" ? scoreCountX++ : scoreCount0++;
    return true;
  }
  return false;
};

const checkIfDraw = () => {
  if (turnCount === 9) {
    setTimeout(() => alert(`It's a DRAW 😅, better luck next round.`), 500);
    shouldResetBoard = false;
  }
};

const resetBoard = () => {
  tiles.forEach((tile) => {
    if (tile.innerText !== "") {
      tile.innerText = "";
    }
  });
  for (const key in board) {
    board[key] = null;
  }
  turnCount = 0;
  currentPlayer = "X";
};

const clearScores = () => {
  scoreCountX = 0;
  scoreCount0 = 0;
  updateScoreboard(scoreCountX, scoreCount0);
};

tiles.forEach((tile) => tile.addEventListener("click", handleClicks));
restartBtn.addEventListener("click", resetBoard); //function to clear board if player chooses to restart mid game
clearScoresBtn.addEventListener("click", clearScores);

// tiles.forEach((tile) => tile.addEventListener("click",() => checkIfPlayerWon(currentPlayer))
// const strikeThrough = (currentPlayer: string) => {
//   tiles.forEach((tile) => {
//     if (tile.innerText !== "" && tile.innerText === currentPlayer) {
//       tile.style.textDecoration = "line-through";
//     }
//   });
// };

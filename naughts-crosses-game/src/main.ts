import "./style.scss";
import "./media-queries.scss";

//Selecting HTML elements through the DOM
const tiles = document.querySelectorAll<HTMLDivElement>(".board__tile");
const allScoreSpans = document.querySelector<HTMLSpanElement>(
  ".header__scoreboard-player"
);
const scoreXSpan = document.querySelector<HTMLSpanElement>("#scoreX");
const score0Span = document.querySelector<HTMLSpanElement>("#score0");
const restartBtn = document.querySelector<HTMLButtonElement>(
  ".header__restartBtn"
);
const clearScoresBtn = document.querySelector<HTMLButtonElement>(
  ".header__clearScoresBtn"
);

let scoreCountX = 0; // initialise score count
let scoreCount0 = 0; // initialise score count

if (
  !tiles ||
  !restartBtn ||
  !score0Span ||
  !scoreXSpan ||
  !allScoreSpans ||
  !clearScoresBtn
) {
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
  
  checkIfPlayerWon(currentPlayer);
  updateScoreboard(scoreCountX, scoreCount0);

  //   checkIfDraw();

  // switch players
  currentPlayer = currentPlayer === "X" ? "O" : "X";
};

const alertPlayerWin = (currentPlayer: string) => {
  setTimeout(() => alert(`Player ${currentPlayer} has Won!🏆`), 500);
};

// const strikeThrough = (currentPlayer: string) => {
//   tiles.forEach((tile) => {
//     if (tile.innerText !== "" && tile.innerText === currentPlayer) {
//       tile.style.textDecoration = "line-through";
//     }
//   });
// };

const updateScoreboard = (scoreX: number, score0: number) => {
  scoreXSpan.innerText = `X: ${scoreX}`;
  score0Span.innerText = `0: ${score0}`;
};

const checkIfPlayerWon = (currentPlayer: string) => {
  // let isWinner: boolean = false;
  if (
    board.upperLeft === currentPlayer &&
    board.upperCenter === currentPlayer &&
    board.upperRight === currentPlayer
  ) {
      alertPlayerWin(currentPlayer);
      currentPlayer === "X" ? scoreCountX++ : scoreCount0++;
  }
  if (
    board.middleLeft === currentPlayer &&
    board.middleCenter === currentPlayer &&
    board.middleRight === currentPlayer
  ) {
      alertPlayerWin(currentPlayer);
      currentPlayer === "X" ? scoreCountX++ : scoreCount0++;
  }
  if (
    board.lowerLeft === currentPlayer &&
    board.lowerCenter === currentPlayer &&
    board.lowerRight === currentPlayer
  ) {
      alertPlayerWin(currentPlayer);
      currentPlayer === "X" ? scoreCountX++ : scoreCount0++;
  }
  if (
    board.upperLeft === currentPlayer &&
    board.middleCenter === currentPlayer &&
    board.lowerRight === currentPlayer
  ) {
      alertPlayerWin(currentPlayer);
      currentPlayer === "X" ? scoreCountX++ : scoreCount0++;
  }
  if (
    board.upperRight === currentPlayer &&
    board.middleCenter === currentPlayer &&
    board.lowerLeft === currentPlayer
  ) {
      alertPlayerWin(currentPlayer);
      currentPlayer === "X" ? scoreCountX++ : scoreCount0++;
  }
};

// const checkIfDraw = () => {};

const resetBoard = () => {
  tiles.forEach((tile) => {
    if (tile.innerText !== "") {
      tile.innerText = "";
    }
  });
  for (const key in board) {
    board[key] = null;
  }
};

// const clearScores = () => {
//   allScoreSpans.
// };

tiles.forEach((tile) => tile.addEventListener("click", handleClicks));
restartBtn.addEventListener("click", resetBoard);
// clearScoresBtn.addEventListener("click", clearScores);
// tiles.forEach((tile) => tile.addEventListener("click",() => checkIfPlayerWon(currentPlayer))

/* eslint-disable require-jsdoc */
function checkForWins() {
  // check rows
  for (let i = 0; i < 3; i++) {
    if (
      makeBoard.gameBoard[i][0] == makeBoard.gameBoard[i][1] &&
      makeBoard.gameBoard[i][1] == makeBoard.gameBoard[i][2]
    ) {
      //   alert(`GAME OVER: ${makeBoard.gameBoard[i][0]} wins!`);
      openModal(modal);
      return true;
    }
  }

  // check columns
  for (let i = 0; i < 3; i++) {
    if (
      makeBoard.gameBoard[0][i] == makeBoard.gameBoard[1][i] &&
      makeBoard.gameBoard[1][i] == makeBoard.gameBoard[2][i]
    ) {
      //   alert(`GAME OVER: ${makeBoard.gameBoard[0][i]} wins!`);
      openModal(modal);
      return true;
    }
  }

  // check diagonals
  if (
    makeBoard.gameBoard[0][0] == makeBoard.gameBoard[1][1] &&
    makeBoard.gameBoard[1][1] == makeBoard.gameBoard[2][2]
  ) {
    // alert(`GAME OVER: ${makeBoard.gameBoard[0][0]} wins!`);
    openModal(modal);
    return true;
  }

  if (
    makeBoard.gameBoard[0][2] == makeBoard.gameBoard[1][1] &&
    makeBoard.gameBoard[1][1] == makeBoard.gameBoard[2][0]
  ) {
    // alert(`GAME OVER: ${makeBoard.gameBoard[0][2]} wins!`);
    openModal(modal);
    return true;
  }

  if (makeBoard.playedSquares.length >= 9) {
    openModal(modal);
  }
  return false;
}

const makeBoard = (() => {
  const playedSquares = [];
  const gameBoard = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  return { gameBoard, playedSquares };
})();

const playerFactory = (name, weapon) => {
  const makeMove = (dataX, dataY) => {
    makeBoard.gameBoard[dataX][dataY] = `${weapon}`;
  };
  return { name, weapon, makeMove };
};

// eslint-disable-next-line require-jsdoc
function gameLogic() {
  let currentPlayer = player1;

  const divElement = document.getElementById("board");
  divElement.addEventListener("click", function (event) {
    let dataX = event.target.getAttribute("data-x");
    let dataY = event.target.getAttribute("data-y");

    if (makeBoard.playedSquares.includes(`${dataX},${dataY}`)) {
      return;
    }

    makeBoard.playedSquares.push(`${dataX},${dataY}`);
    currentPlayer.makeMove(dataX, dataY);
    event.target.innerHTML = currentPlayer.weapon;

    checkForWins();
    if (checkForWins()) {
      return;
    }

    if (currentPlayer == player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  });
}

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
  resetButton();
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
  formReset();
}

function resetButton() {
    const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", function() {
  location.reload();
});

}

const player1 = playerFactory("player1", "X");
const player2 = playerFactory("player2", "O");
const modal = document.getElementById("modal");
gameLogic();

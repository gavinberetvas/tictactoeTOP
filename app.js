/* eslint-disable require-jsdoc */
function checkForWins() {
  // check rows
  for (let i = 0; i < 3; i++) {
    if (
      makeBoard.gameBoard[i][0] == makeBoard.gameBoard[i][1] &&
      makeBoard.gameBoard[i][1] == makeBoard.gameBoard[i][2]
    ) {
      alert(`GAME OVER: ${makeBoard.gameBoard[i][0]} wins!`);
      return true;
    }
  }

  // check columns
  for (let i = 0; i < 3; i++) {
    if (
      makeBoard.gameBoard[0][i] == makeBoard.gameBoard[1][i] &&
      makeBoard.gameBoard[1][i] == makeBoard.gameBoard[2][i]
    ) {
      alert(`GAME OVER: ${makeBoard.gameBoard[0][i]} wins!`);
      return true;
    }
  }

  // check diagonals
  if (
    makeBoard.gameBoard[0][0] == makeBoard.gameBoard[1][1] &&
    makeBoard.gameBoard[1][1] == makeBoard.gameBoard[2][2]
  ) {
    alert(`GAME OVER: ${makeBoard.gameBoard[0][0]} wins!`);
    return true;
  }

  if (
    makeBoard.gameBoard[0][2] == makeBoard.gameBoard[1][1] &&
    makeBoard.gameBoard[1][1] == makeBoard.gameBoard[2][0]
  ) {
    alert(`GAME OVER: ${makeBoard.gameBoard[0][2]} wins!`);
    return true;
  }

  return false;
}

const makeBoard = (() => {
  const gameBoard = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  return { gameBoard };
})();

const playerFactory = (name, weapon) => {
  const makeMove = (dataX, dataY) => {
    makeBoard.gameBoard[dataX][dataY] = `${weapon}`;
  };
  return { name, weapon, makeMove };
};

const player1 = playerFactory("player1", "X");
const player2 = playerFactory("player2", "O");

// eslint-disable-next-line require-jsdoc
function gameLogic() {
  let currentPlayer = player1;
  const divElement = document.getElementById("board");
  const playedSquares = [];

  divElement.addEventListener("click", function (event) {
    let dataX = event.target.getAttribute("data-x");
    let dataY = event.target.getAttribute("data-y");

    if (playedSquares.includes(`${dataX},${dataY}`)) {
      return;
    }
    playedSquares.push(`${dataX},${dataY}`);

    currentPlayer.makeMove(dataX, dataY);

    checkForWins();
    if (checkForWins()) {
      return;
    }

    if (currentPlayer == player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }

    alert(makeBoard.gameBoard);
  });
}

gameLogic();
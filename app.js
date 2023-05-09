let currentPlayer = '';

function checkForWins() {
    if (
      makeBoard.gameBoard[0][0] ==
      makeBoard.gameBoard[1][0] ==
      makeBoard.gameBoard[2][0]
    ) {
      alert("GAME OVER");
    }
    }
  

const makeBoard = (() => {
  const gameBoard = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  return {gameBoard};
})();

const playerFactory = (name, weapon) => {
  const makeMove = (dataX, dataY) => {
    makeBoard.gameBoard[dataX][dataY] = `${weapon}`;
  };
  return {name, weapon, makeMove};
};

const player1 = playerFactory("player1", "X");
const player2 = playerFactory("player2", "O");

// eslint-disable-next-line require-jsdoc
function gameLogic() {
  let currentPlayer = player1;
  const divElement = document.getElementById("board");

  divElement.addEventListener("click", function (event) {
    let dataX = event.target.getAttribute("data-x");
    let dataY = event.target.getAttribute("data-y");

    currentPlayer.makeMove(dataX, dataY);

    checkForWins();

    if (currentPlayer == player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }

    alert(makeBoard.gameBoard);
  });
}

gameLogic();


// const divElement = document.getElementById("board");

// divElement.addEventListener("click", function (event) {
//   let dataX = event.target.getAttribute("data-x");
//   let dataY = event.target.getAttribute("data-y");

//   currentPlayer.makeMove(dataX, dataY);

//   if (currentPlayer == player1) {
//     currentPlayer = player2;
//   } else {
//     currentPlayer = player1;
//   }

//   alert(makeBoard.gameBoard);
// });

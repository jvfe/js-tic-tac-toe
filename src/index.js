const gameBoard = (() => {
  let boardArray = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

  const boardDisplay = document.querySelector(".board-display");

  const setCell = (position, newValue) => {
    boardArray[position] = newValue;
  };

  const getBoard = () => {
    return boardArray;
  };

  const renderDisplay = () => {
    boardDisplay.textContent = " ";
    boardArray.map((element, index) => {
      let cell = document.createElement("button");
      cell.classList.add("cell");
      cell.textContent = element;
      cell.dataset.index = index;
      boardDisplay.appendChild(cell);
    });
  };

  return { getBoard, setCell, renderDisplay };
})();

const Player = (name, symbol) => {
  const data = {
    name,
    symbol,
  };

  const play = (position) => {
    gameBoard.setCell(position, data.symbol);
  };

  return Object.assign({}, data, { play });
};

const gameController = (() => {
  const setPlayers = (player1Name, player2Name) => {
    const Player1 = Player(player1Name, "X");
    const Player2 = Player(player2Name, "O");
    return { Player1, Player2 };
  };

  const { Player1, Player2 } = setPlayers("player1", "player2");
  let currentPlayer = Player1;
  let gameOver = false;

  const playerDiv = document.querySelector(".current-player");

  const setCurrentPlayer = () => {
    currentPlayer = currentPlayer == Player1 ? Player2 : Player1;
    playerDiv.textContent = currentPlayer.name;
  };

  const handleTurn = () => {
    if (checkWin()) {
      gameBoard.renderDisplay();
      gameOver = true;
      console.log(`its a win for ${currentPlayer.name}!`);
    } else if (checkTie()) {
      gameBoard.renderDisplay();
      gameOver = true;
      console.log("its a tie!");
    } else {
      setCurrentPlayer();
      gameBoard.renderDisplay();
    }
  };

  const checkWin = () => {
    const winBoards = [
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    const currentBoard = gameBoard.getBoard();

    const boardOnWin = winBoards.map((i) => i.map((j) => currentBoard[j]));

    return boardOnWin.some((row) =>
      row.every((cell) => cell === row[0] && cell !== " ")
    );
  };

  const checkTie = () => {
    return gameBoard.getBoard().every((cell) => cell !== " ");
  };

  const startGame = () => {
    handleTurn();
    if (gameOver === false) {
      const cells = document.querySelectorAll(".cell");

      cells.forEach((cell) => {
        cell.addEventListener("click", () => {
          if (cell.textContent === " ") {
            const pos = parseInt(cell.dataset.index);
            currentPlayer.play(pos);
            startGame();
          }
        });
      });
    }
  };

  return { startGame };
})();

gameController.startGame();

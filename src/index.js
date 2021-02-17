const gameBoard = (() => {
  let boardArray = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];

  const boardDisplay = document.querySelector(".board-display");

  const setCell = (position, newValue) => {
    boardArray[position] = newValue;
  };

  const renderDisplay = () => {
    boardDisplay.textContent = "";
    boardArray.map((element, index) => {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.textContent = element;
      cell.dataset.index = index;
      boardDisplay.appendChild(cell);
    });
  };

  return { setCell, renderDisplay };
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
  let currentPlayer = Player2;

  const playerDiv = document.querySelector(".current-player");

  //
  const setCurrentPlayer = () => {
    currentPlayer = currentPlayer == Player1 ? Player2 : Player1;
    playerDiv.textContent = currentPlayer.name;
  };

  const handleTurn = () => {
    gameBoard.renderDisplay();
    setCurrentPlayer();
  };

  const startGame = () => {
    handleTurn();
    const cells = document.querySelectorAll(".cell");

    cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        if (cell.textContent === "-") {
          const pos = parseInt(cell.dataset.index);
          currentPlayer.play(pos);
          startGame();
        }
      });
    });
  };

  return { startGame };
})();

gameController.startGame();

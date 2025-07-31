const Gameboard = (function() {
    let board = [[null, null, null], [null, null, null], [null, null, null]];

    return {
        getBoard: function() {
            return board;
        },
        reset: function() {
            for (let row = 0; row < board.length; row++) {
                for (let col = 0; col < board[row].length; col++) {
                    board[row][col] = null;
                }
            }
        },
        setCell: function(row, col, player) {
            if (board[row][col] === null) {
                board[row][col] = player;
                return true;
            }
            return false;
        }
    };
})();

function renderGameboard(gameboard){
    const container = document.querySelector("#gameboard");
    container.innerHTML = '';
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.textContent = gameboard[row][col] || '';
            cell.addEventListener("click", () => GameController.makeMove(row, col));
            container.appendChild(cell);
        }
    }
}

function disableBoard() {
    const container = document.querySelector("#gameboard");
    container.innerHTML = '';
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            container.appendChild(cell);
        }
    }
};

const GameController = (function() {
    let currentPlayer = "X";
    const statusDisplay = document.querySelector("#statusDisplay");
    statusDisplay.textContent = `${currentPlayer}'s turn`

    function checkGameStatus(gameboard) {
    for (let i = 0; i < 3; i++) {
        // Check rows
        if (gameboard[i][0] === gameboard[i][1] && gameboard[i][1] === gameboard[i][2]) {
            return gameboard[i][0];
        }
        // Check columns
        if (gameboard[0][i] === gameboard[1][i] && gameboard[1][i] === gameboard[2][i]) {
            return gameboard[0][i];
        }
    }
    // Check diagonals
    if (gameboard[0][0] === gameboard[1][1] && gameboard[1][1] === gameboard[2][2]) {
        return gameboard[0][0];
    }
    if (gameboard[0][2] === gameboard[1][1] && gameboard[1][1] === gameboard[2][0]) {
        return gameboard[0][2];
    }
    // Check for tie or ongoing
    for (let row of gameboard) {
        if (row.includes(null)) { 
            return null; // Game ongoing
        }
    }
    return 'tie';
    }
    
    function updateStatus(message) {
        statusDisplay.textContent = message;
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        updateStatus(`${currentPlayer}'s turn`);
    }

    function makeMove(row, col) {
        if (Gameboard.setCell(row, col, currentPlayer)) {
            const result = checkGameStatus(Gameboard.getBoard());
            if (result === "tie") {
                disableBoard();
                updateStatus("It's a tie!");
            } else if (result) {
                disableBoard();
                updateStatus(`${result} wins!`);
            } else {
                switchPlayer();
            }
            renderGameboard(Gameboard.getBoard(), currentPlayer);
        }
    }
    
    function resetGame() {
        Gameboard.reset();
        renderGameboard(Gameboard.getBoard());
        currentPlayer = "X";
        updateStatus(`${currentPlayer}'s turn`)

    }

    return {makeMove, resetGame};
})();

const resetBtn = document.querySelector("#resetBtn");
resetBtn.addEventListener("click", () => {
    GameController.resetGame();
    playGame();
});

function playGame() {
    renderGameboard(Gameboard.getBoard());
}

playGame();
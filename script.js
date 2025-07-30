function playGame() {
    function createGameboard() {
        let gameboard = [[null, null, null], [null, null, null], [null, null, null]];
        return gameboard;
    }

    let gameboard = createGameboard();

    function checkGameStatus() {
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

    function makeMove(row, col, symbol) {
        gameboard[row][col] = symbol;
        checkGameStatus();
    }
}
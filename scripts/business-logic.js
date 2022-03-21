const boardSetup = new Array(3);
boardSetup[0] = new Array(3);
boardSetup[1] = new Array(3);
boardSetup[2] = new Array(3);

// Checks if the values in a line are identical.
const winnerFound = function(line) {
    let output = true;

    for (let i = 0; i < line.length; i++) {
        
        if (!line[i] || line[i] != line[0]) {
            output = false;
        };

    };

    return output;
};

// Checks if there is a winning line present on the board.
const winnerCheck = function() {
    
    for (let i = 0; i < game.board.length; i++) {

        const colToCheck = [];
        const rowToCheck = [];
        const descDiagCheck = [];
        const ascDiagCheck = [];

        for (let j = 0; j < game.board.length; j++) {

            colToCheck.push(game.board[i][j]);
            rowToCheck.push(game.board[j][i]);
            descDiagCheck.push(game.board[j][j]);
            ascDiagCheck.push(game.board[j][game.board.length - 1 - j])

        };
        
        // returns true if all values in a row, column or diagonal are the same.
        if ( winnerFound(colToCheck) || winnerFound(rowToCheck) || winnerFound(descDiagCheck) || winnerFound(ascDiagCheck) ) {
            return true;
        };

    };

    return false;
};

// Checks if the board tiles are all occupied.
const drawCheck = function() {

    for (let i = 0; i < game.board.length; i++) {
        
        for (let j = 0; j < game.board[0].length; j++) {

            if (!game.board[i][j]) {
                return false;
            };

        };

    };

    return true;
};

// Generates a report object for delivery to DOM-handler.js
const generateOutcome = function(message) {
    const output = {};
    
    if (message === '-') {
        output.message = "Draw!";
        output.gameOver = true;
    } else if (message === 'X') {
        output.message = "X Wins!";
        output.gameOver = true;
    } else if (message === 'O') {
        output.message = "O Wins!";
        output.gameOver = true;
    } else {
        output.message = "The game continues...";
    };

    return output;
};

// Main game object.
const game = {
    
    board: boardSetup, // Stores the board state.

    gameOver: false, // Stores whether game has ended.

    // Move methods place piece at 0-index'd position on the board and returns the outcome of the move in an object.
    xMove: function(x, y) {
        
        this.board[y][x] = 'X';
        
        if (winnerCheck()) {
            return generateOutcome('X');
        } else if (drawCheck()) {
            return generateOutcome('-');
        };

        return generateOutcome();
    },

    oMove: function (x, y) {
        
        this.board[y][x] = 'O';

        if (winnerCheck()) {
            return generateOutcome('O');
        } else if (drawCheck()) {
            return generateOutcome('-');
        };

        return generateOutcome();
    }

};

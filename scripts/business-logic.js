console.log('business-logic connected');

const boardSetup = new Array(3);
boardSetup[0] = new Array(3);
boardSetup[1] = new Array(3);
boardSetup[2] = new Array(3);

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
            ascDiagCheck.push(game.board[j][game.board.length- 1 - j])

        };
        
        // Checks if a value is equal to first element in the row/col being checked.
        const winnerFound = function(element, index, array) {
            return element >= array[0];
        };

        // returns true if all values in a row, column or diagonal are the same.
        if (colToCheck.every(winnerFound) || rowToCheck.every(winnerFound) ||descDiagCheck.every(winnerFound) || ascDiagCheck.every(winnerFound)) {
            
            return true;
            
        };

    };


    return false;

};

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

const generateOutcome = function(outcome) {
    const output = {};
    
    if (outcome === '-') {
        output.outcome = "Draw!";
    } else if (outcome === 'X') {
        output.outcome = "X Wins!";
    } else if (outcome === 'O') {
        output.outcome = "O Wins!";
    } else {
        output.outcome = "Invalid Outcome";
    };

    return output;
};

const game = {
    
    board: boardSetup,

    // Place piece at 0-index'd position on the board.
    // Returns outcome object if terminating move played, else false.
    xMove: function(x, y) {
        
        this.board[y][x] = 'X';
        
        if (winnerCheck()) {
            return generateOutcome('X');
        } else if (drawCheck()) {
            return generateOutcome('-');
        };

    },

    oMove: function (x, y) {
        
        this.board[y][x] = 'O';

        if (winnerCheck()) {
            return generateOutcome('O');
        } else if (drawCheck()) {
            return generateOutcome('-');
        };

    }

};
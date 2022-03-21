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
        const winnerFound = function(line) {
            let output = true;

            for (let i = 0; i < line.length; i++) {
                
                if (!line[i] || line[i] != line[0]) {
                    output = false;
                };

            };

            return output;
        };

        // returns true if all values in a row, column or diagonal are the same.
        if ( winnerFound(colToCheck) ) {
            console.log('col victory');
            console.log(colToCheck);
            return true;
        };

        if ( winnerFound(rowToCheck) ) {
            console.log('row victory');
            console.log(rowToCheck);
            return true;
        };

        if ( winnerFound(descDiagCheck) ) {
            console.log('desc victory');
            console.log(descDiagCheck);

            return true;
        };

        if ( winnerFound(ascDiagCheck) ) {
            console.log('asc victory');
            console.log(ascDiagCheck);
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

const game = {
    
    board: boardSetup,

    gameOver: false,

    // Place piece at 0-index'd position on the board.
    // Returns message object if terminating move played, else false.
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
const boardSetup = function(size) {

    const boardSetup = new Array(size);

    for (let i = 0; i < size; i++) {
        boardSetup[i] = new Array(size);
    };

    return boardSetup;
};

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
        output.message = `${game.mode} Wins!`;
        output.gameOver = true;
    } else {
        output.message = "The game continues...";
    };

    return output;
};

// AI move functions --------------------------
// Identifies if line can be won
const winningLine = function(line, player) {

    const lineInfo = {
        emptyCount: 0,
        tokensPlaced: []
    };

    for (let i = 0; i < line.length; i++) {
        if (!line[i]) {
            lineInfo.emptyCount++;
            lineInfo.emptyPos = i;
        };
    };
    
    if (lineInfo.emptyCount === 1) {

        for (let i = 0; i < line.length; i++) {

            if (i != lineInfo.emptyPos) {
                lineInfo.tokensPlaced.push(line[i]);
            };

        };

        if (lineInfo.tokensPlaced[0] === lineInfo.tokensPlaced[1] && lineInfo.tokensPlaced[0] === player) {
            return lineInfo.emptyPos;
        };
    };

};

// finishes a row if possible
const finishLine = function() {

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
        
        // returns winning position if there is one in current board state.
        if ( Number.isInteger(winningLine(colToCheck, "O")) ) {
            const winningXPos = winningLine(colToCheck, "O");
            let winningPos = [winningXPos, i]; // [x, y]
            console.log('winning column found');
            return winningPos;
        } else if ( Number.isInteger(winningLine(rowToCheck, "O")) ) {
            const winningYPos = winningLine(rowToCheck, "O");
            let winningPos = [i, winningYPos]; // [x, y]
            console.log('winning row found');
            return winningPos;
        } else if ( Number.isInteger(winningLine(descDiagCheck, "O")) ) {
            const winningXYPos = winningLine(descDiagCheck, "O");
            let winningPos = [winningXYPos, winningXYPos]; // [x, y]
            return winningPos;
        } else if ( Number.isInteger(winningLine(ascDiagCheck, "O")) ) {
            const j = winningLine(ascDiagCheck, "O");
            let winningPos = [game.board.length - 1 - j, j]; // [x, y]
            return winningPos;
        };

    };

};

// blocks a row
const blockLine = function() {
    // exactly like finish row except it looks at X's pieces
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
        
        // returns winning position if there is one in current board state.
        if ( Number.isInteger(winningLine(colToCheck, "X")) ) {
            const winningXPos = winningLine(colToCheck, "X");
            let winningPos = [winningXPos, i]; // [x, y]
            console.log('winning column found');
            return winningPos;
        } else if ( Number.isInteger(winningLine(rowToCheck, "X")) ) {
            const winningYPos = winningLine(rowToCheck, "X");
            let winningPos = [i, winningYPos]; // [x, y]
            console.log('winning row found');
            return winningPos;
        } else if ( Number.isInteger(winningLine(descDiagCheck, "X")) ) {
            const winningXYPos = winningLine(descDiagCheck, "X");
            let winningPos = [winningXYPos, winningXYPos]; // [x, y]
            return winningPos;
        } else if ( Number.isInteger(winningLine(ascDiagCheck, "X")) ) {
            const j = winningLine(ascDiagCheck, "X");
            let winningPos = [game.board.length - 1 - j, j]; // [x, y]
            return winningPos;
        };

    };

};

// finds empty corner
const findCorner = function() {
    for (let i = 0; i < game.board.length; i += 2) {
        for (let j = 0; j < game.board.length; j += 2) {
            if (!game.board[j][i]) {
                return [i, j];
            };
        };
    };
};

// finds empty edge
const findEdge = function() {
    for (let i = 0; i < game.board.length; i += 2) {

        if (!game.board[i][1]) {
            return [1, i];
        } else if (!game.board[1][i]) {
            return [i, 1];
        };

    };
};

// scores boardstate on winnability
const moveScorer = function(boardState, piece) {

    let score = 0;
    for (let i = 0; i < boardState.length; i++) {
        const colToCheck = [];
        const rowToCheck = [];
        const descDiagCheck = [];
        const ascDiagCheck = [];

        for (let j = 0; j < boardState.length; j++) {
            rowToCheck.push(boardState[i][j]);
            colToCheck.push(boardState[j][i]);

            descDiagCheck.push(boardState[j][j]);
            ascDiagCheck.push(boardState[j][boardState.length - 1 - j])

        };
        
        // +1 to score per follow up play that would lead to victory
        if ( Number.isInteger(winningLine(colToCheck, piece)) ) {
            score++;
            console.log("winning col found")
        };
        
        if ( Number.isInteger(winningLine(rowToCheck, piece)) ) {
            score++;
            console.log("winning row found")

        };
        
        // only check the diagonals once
        if (i === 0) {

            if ( Number.isInteger(winningLine(descDiagCheck, piece)) ) {
                score++
                console.log("winning desc found")

            }
            
            if ( Number.isInteger(winningLine(ascDiagCheck, piece)) ) {
                score++
                console.log("winning asc found")

            };

        };

    };

    return score;

};

const findBestMove = function(piece) {
    
    // find empty tiles
    let emptyTiles = [];
    for (let y = 0; y < game.board.length; y++) {
        
        for (let x = 0; x < game.board.length; x++) {
            
            if (!game.board[y][x]) {
                emptyTiles.push([x, y]);
            };
            
        };
        
    };
    console.log("empty tiles: ");
    console.log(emptyTiles);

    const scores = [];

    for (let i = 0; i < emptyTiles.length; i++) {

        // makes copy of game.board
        const boardCopy = boardSetup(3);
        for (let i = 0; i < game.board.length; i++) {
    
            for (let j = 0; j < game.board.length; j++) {
    
                boardCopy[i][j] = game.board[i][j];
    
            };
    
        };

        // makes play on copy of board
        boardCopy[emptyTiles[i][1]][emptyTiles[i][0]] = piece;
    
        // scores board state after play 
        console.log("Checking boardstate: ");
        console.table(boardCopy);
        scores.push(moveScorer(boardCopy, piece));

    };

    // find best score
    let bestScore = 0;
    for (let i = 0; i < scores.length; i++) {
        if (scores[i] > scores[bestScore]) {
            bestScore = i;
        };
    };

    // best move is empty tile with the best score
    console.log("scores: " + scores);
    console.log("bestScore: " + bestScore);
    console.log("if you play to " + emptyTiles[bestScore] + ", then you will have " + scores[bestScore] + " ways to win");
    return [emptyTiles[bestScore],scores[bestScore]]; // first element is tile, second is that tiles score

};

// --------------------------------------------

// Main game object.
const game = {

    mode: "O",

    boardSize: 3,
    
    board: boardSetup(3), // Stores the board state.

    turn: 1,

    gameOver: false, // Stores whether game has ended.

    xWins: 0,

    oWins: 0,

    // Move methods place piece at 0-index'd position on the board and returns the outcome of the move in an object.
    xMove: function(x, y) {
        console.log('x move made');
        
        this.board[y][x] = 'X';
        
        if (winnerCheck()) {
            this.xWins ++;
            return generateOutcome('X');
        } else if (drawCheck()) {
            return generateOutcome('-');
        };

        this.turn++;

        return generateOutcome();
    },

    oMove: function (x, y) {
        console.log('o move made');
        
        this.board[y][x] = 'O';

        if (winnerCheck()) {
            this.oWins ++;
            return generateOutcome('O');
        } else if (drawCheck()) {
            return generateOutcome('-');
        };

        this.turn++;

        return generateOutcome();
    },

    // Places randomely.
    hughMove: function () {

        while (true) {
            // randomize two values (0-2)
            const movePos = {
                x: Math.floor(Math.random() * 3),
                y: Math.floor(Math.random() * 3)
            };
            // check if those coordinates are occupied
            const posOccupied = this.board[movePos.y][movePos.x];
            if (!posOccupied) {
                // if not, make oMove() with those coordinates, else loop
                const outcome = this.oMove(movePos.x, movePos.y);
                outcome.movePos = [movePos.x, movePos.y];
                console.log(outcome);
                return outcome;
            };

        };
    },

    // Completes lines but otherwise places randomely.
    carterMove: function() {

        const movePos = {
            x: Math.floor(Math.random() * 3),
            y: Math.floor(Math.random() * 3)
        };

        let bestMove;
        if (finishLine()) {
            console.log("finishing line");

            bestMove = finishLine();

            movePos.x = bestMove[0];
            movePos.y = bestMove[1];

            // make oMove() with those coordinates
            const outcome = this.oMove(movePos.x, movePos.y);
            outcome.movePos = [movePos.x, movePos.y];
            console.log(outcome);
            return outcome;

        } else if (blockLine()) {
            console.log("blocking line");

            bestMove = blockLine();

            movePos.x = bestMove[0];
            movePos.y = bestMove[1];

            // make oMove() with those coordinates
            const outcome = this.oMove(movePos.x, movePos.y);
            outcome.movePos = [movePos.x, movePos.y];
            console.log(outcome);
            return outcome;

        } else {

            while (true) {
                // randomize two values (0-2)
                const movePos = {
                    x: Math.floor(Math.random() * 3),
                    y: Math.floor(Math.random() * 3)
                };
                // check if those coordinates are occupied
                const posOccupied = this.board[movePos.y][movePos.x];
                if (!posOccupied) {
                    // if not, make oMove() with those coordinates, else loop
                    const outcome = this.oMove(movePos.x, movePos.y);
                    outcome.movePos = [movePos.x, movePos.y];
                    console.log(outcome);
                    return outcome;
                };
    
            };

        };

    },

    // Places in optimal positions.
    joelMove: function() {

        const movePos = {
            x: 0,
            y: 0
        };

        let bestMove;
        if (finishLine()) {
            console.log("finishing line");

            bestMove = finishLine();

            movePos.x = bestMove[0];
            movePos.y = bestMove[1];

        } else if (blockLine()) {
            console.log("blocking line");

            bestMove = blockLine();

            movePos.x = bestMove[0];
            movePos.y = bestMove[1];

        } else if (findBestMove('O')[1] > 1) {
            console.log("playing best move");
            const bestMove = findBestMove('O');

            movePos.x = bestMove[0][0];
            movePos.y = bestMove[0][1];

        } else if (findBestMove('X')[1] > 1) { //blocks opponents best move
            console.log("blocking best move");
            const bestMove = findBestMove('X');

            movePos.x = bestMove[0][0];
            movePos.y = bestMove[0][1];

        } else if (this.turn === 2 && !this.board[1][1]) {
            console.log("placing in middle");

            movePos.x = 1;
            movePos.y = 1;

        } else if (this.turn === 4 && !this.board[0][0] && !this.board[0][2]) {
            console.log("placing on edge")

            //prioritize edges
            bestMove = findEdge()
            movePos.x = bestMove[0];
            movePos.y = bestMove[1];
            
        } else if (this.turn === 4) { // one exception to previous case

            //right edge
            movePos.x = 2;
            movePos.y = 1;
            
        } else if (findCorner()) {
            console.log("placing in corner");
            
            // prioritize corners
            bestMove = findCorner();
            movePos.x = bestMove[0];
            movePos.y = bestMove[1];

        } else {
            console.log("picking whatever is left over");
            // just pick a damn spot
            bestMove = findBestMove();

            movePos.x = bestMove[0][0];
            movePos.y = bestMove[0][1];
        };

        // make oMove() with those coordinates
        const outcome = this.oMove(movePos.x, movePos.y);
        outcome.movePos = [movePos.x, movePos.y];
        console.log(outcome);
        return outcome;
    },

    resetBoard: function() { this.board = boardSetup(this.boardSize) }

};

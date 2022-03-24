let xTurn = true; // Boolean to track player turns.

$(document).ready(function() {
    
    const hoverIn = function(eventTrigger) {
        const $piece = $(eventTrigger).children();

        if ($piece.hasClass('hidden')) {

            $piece.addClass('hover');
            $piece.removeClass('hidden');
            
            if (xTurn) {
                $piece.text('X');
            } else {
                $piece.text('O');
            };

        };

    };

    const hoverOut = function(eventTrigger) {
        const $piece = $(eventTrigger).children();

        if ($piece.hasClass('hover')) {
            $piece.removeClass('hover');
            $piece.addClass('hidden');
        };

    };

    setTileHoverListener = function() {

        $('.tile').hover( 

            function() {
                hoverIn(this) // Adds .hover piece when mouse is over empty tile.
            },
            function() {
                hoverOut(this) // Removes .hover piece when mouse is over empty tile
            }

        );

    };

    setTileHoverListener();

    
    const newGame = function(eventTrigger) {
        const $tileClasses = $(eventTrigger)[0].classList;
        const $piece = $(eventTrigger).children();
    
        // Check class for coordinates of clicked node.
        const x = $tileClasses[1][1];
        const y = $tileClasses[2][1];
    
        // Run move function with coordinates the insert piece into node
        if ($piece.hasClass('hover')) {
    
            if (xTurn) {
                const outcome = game.xMove(x, y);

                placePiece(outcome, $piece);

                // AI mode
                aiMove(outcome);

                gameOver(outcome);

            } else {
                const outcome = game.oMove(x, y);

                placePiece(outcome, $piece);

                gameOver(outcome);
    
            };

            xTurn = !xTurn;

            // Feeling lazy, update score after every move...
            const $scores = $('.score h4:last-child');
            $scores.eq(0).text(game.xWins);
            $scores.eq(1).text(game.oWins);
            
        };
    
    };

    const setTileClickListener = function() {
        $('.tile').on('click', function() {
            newGame(this);
        });
    };

    setTileClickListener();

    // Places piece on board.
    const placePiece = function(outcome, $piece) {
        $piece.removeClass('hover');
        $('.results').html(`<h3>${outcome.message}</h3>`);
    };

    // if Game Over, stop listener
    const gameOver = function(outcome) {
        if (outcome.gameOver) {
            $('.tile').off();

            $('.rematch').toggleClass('hidden'); // Reveal rematch button
        };
    };

    // Rematch event listener
    $('.rematch').on('click', function() {
        game.resetBoard();
        game.turn = 1;
        
        $tile = $('.tile');
        $pieces = $('.piece');
        // Re-hide all the pieces
        $pieces.addClass('hidden');

        // Re-set event listeners
        setTileClickListener();

        setTileHoverListener();

        // Update results section.
        $results = $('.results h3');
        if (xTurn) {
            $results.text(`X plays first...`)
        } else {
            $results.text(`O plays first...`)
        };

        $('.rematch').toggleClass('hidden'); // Hide rematch button
        
    });

    // Toggles menu when space key is pressed.
    $('body').on('keyup', function() {

        if (arguments[0].originalEvent.code === 'Space') {
            $('.menu').slideToggle(400);
        };

    });
    
    // Menu listeners
    // if you click on the 2 player mode
    $('.mode1').on('click', function() {
        $(this).css('opacity', '100');
        $('.mode2').css('opacity', '50%');
        $('span.option').css('opacity', '50%');
        
        $difficulties = $('.difficulties');
        $difficulties.css('visibility', 'hidden');
        $difficulties.css('opacity', '0');

        // play button
        $('#play').removeAttr('disabled');
        $('#play').css('opacity', '100');

        // Set game mode
        game.mode = $(this).attr('id');
        $('.O h4:first-child').text(`${game.mode}'s Score:`) 

    });

    // if you click on the AI mode
    $('.mode2').on('click', function() {
        $(this).css('opacity', '100');
        $('.mode1').css('opacity', '50%');
        $('.difficulties').css('visibility', 'visible');
        $('.difficulties').css('opacity', '100');
    });

    $('span.option').on('click', function() {
        $('span.option').css('opacity', '50%');
        $(this).css('opacity', '100');
        $(this).removeClass('temp');

        // Set game mode
        game.mode = $(this).attr('id');
        // Set name on score board
        $('.O h4:first-child').text(`${game.mode}'s Score:`)
    });

    // Hovering over AI difficulties
    $('.difficulties span span').hover(
        function() {
            const $difficulty = $(this);
            if ($difficulty.css('opacity') != '700') {
                $difficulty.css('opacity', '100');
                $difficulty.addClass('temp');
            };
        },
        function() {
            if ($(this).hasClass('temp')) {
                $(this).removeClass('temp');
                $(this).css('opacity', '50%');
            };
        }
    );
    
    // places ai's piece in DOM
    const placeAiPiece = function(aiOutcome) {
        // find tiles
        let $tiles = $('.tile');

        // find tile with ai's move position
        $tiles.each(function() {

            const $tile = $(this);
            const xMatches = $tile[0].classList[1][1] == aiOutcome.movePos[0];
            const yMatches = $tile[0].classList[2][1] == aiOutcome.movePos[1];
            // place "O" in that position
            if (xMatches && yMatches) {
                const $piece = $tile.children().eq(0);
                $piece.text('O');
                $piece.removeClass('hidden');
                $('.results').html(`<h3>${aiOutcome.message}</h3>`);

                // Game Over, stop listener
                if (aiOutcome.gameOver) {
                    $('.tile').off();

                    $('.rematch').toggleClass('hidden'); // Reveal rematch button
                };

            };

        });

    };

    const aiMove = function(outcome) {

        if (game.mode === "Hugh") {
    
            if(outcome.message === "The game continues...") {
    
                const aiOutcome = game.hughMove();
                console.log(aiOutcome.movePos);

                placeAiPiece(aiOutcome);
    
            };
    
            xTurn = !xTurn;
    
        } else if (game.mode === "Carter") { 
    
            if(outcome.message === "The game continues...") {
    
                const aiOutcome = game.carterMove();
                console.log(aiOutcome.movePos);
    
                placeAiPiece(aiOutcome);
    
            };
    
            xTurn = !xTurn;
    
        } else if (game.mode === "Joel") {
    
            if(outcome.message === "The game continues...") {
    
                const aiOutcome = game.joelMove();
                console.log(aiOutcome.movePos);
    
                placeAiPiece(aiOutcome);
    
            };
    
            xTurn = !xTurn;
    
        };

    };

    // Easter Egg
    $('h1').on('click', function() {
        
        game.toeTacTic = !game.toeTacTic;

        $tic = $('#tic');
        $toe = $('#toe');

        if (game.toeTacTic) {

            $tic.css('left', '153px');
            $toe.css('left', '-153px');

        } else {

            $tic.css('left', '0');
            $toe.css('left', '0');

        };

    });

});

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

    $('.tile').hover( 
        function() {
            hoverIn(this) // Adds .hover piece when mouse is over empty tile.
        },
        function() {
            hoverOut(this) // Removes .hover piece when mouse is over empty tile
        }
    );
    
    const newGame = function(eventTrigger) {
        const $tile = $(eventTrigger);
        const $piece = $(eventTrigger).children();
    
           // Check class for coordinates of clicked node.
           const x = $tile[0].classList[1][1];
           const y = $tile[0].classList[2][1];
       
           // Run move function with coordinates the insert piece into node
           if ($piece.hasClass('hover')) {
       
               if (xTurn) {
                   const outcome = game.xMove(x, y);
    
                   $piece.removeClass('hover');
                   $('.results').html(`<h3>${outcome.message}</h3>`);
       
                   // Game Over, stop listener
                   if (outcome.gameOver) {
                       $('.tile').off();
    
                       $('.rematch').toggleClass('hidden'); // Reveal rematch button
                   };
       
               } else {
                   const outcome = game.oMove(x, y);
                   
                   $piece.removeClass('hover');
                   $('.results').html(`<h3>${outcome.message}</h3>`);
    
                   // Game Over, stop listener
                   if (outcome.gameOver) {
                       $('.tile').off();
    
                       $('.rematch').toggleClass('hidden'); // Reveal rematch button
                   };
       
               };
    
               xTurn = !xTurn;
    
               // Feeling lazy, update score after every move...
               const $scores = $('.score h4:last-child');
               $scores.eq(0).text(game.xWins);
               $scores.eq(1).text(game.oWins);
               
           };
    
    };

    $('.tile').on('click', function() {
        newGame(this);
    });

    // Rematch event listener
    $('.rematch').on('click', function() {
        game.resetBoard();
        $tile = $('.tile');
        $pieces = $('.piece');
        // Re-hide all the pieces
        $pieces.addClass('hidden');

        // Re-set event listeners
        $tile.on('click', function() {
            newGame(this)
        });

        $('.tile').hover( 
            function() {
                hoverIn(this) // Adds .hover piece when mouse is over empty tile.
            },
            function() {
                hoverOut(this) // Removes .hover piece when mouse is over empty tile
            }
        );

        // Update results section.
        $results = $('.results h3');
        if (xTurn) {
            $results.text(`X plays first...`)
        } else {
            $results.text(`O plays first...`)
        };

        $('.rematch').toggleClass('hidden'); // Hide rematch button
    });

});

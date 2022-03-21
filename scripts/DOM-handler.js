let xTurn = true; // Boolean to track player turns.

$(document).ready(function() {
    
    const newGame = function(eventTrigger) {
        const $tile = $(eventTrigger);
    
           // Check class for coordinates of clicked node.
           const x = $tile[0].classList[1][1];
           const y = $tile[0].classList[2][1];
       
           // Run move function with coordinates the insert piece into node
           if (!$tile.text()) {
       
               if (xTurn) {
                   const outcome = game.xMove(x, y);
    
                   $(eventTrigger).html($('<p class="piece">X</p>'));
                   $('.results').html(`<h3>${outcome.message}</h3>`);
       
                   // Game Over, stop listener
                   if (outcome.gameOver) {
                       $('.tile').off();
    
                       $('.rematch').toggleClass('hidden'); // Reveal rematch button
                   };
       
               } else {
                   const outcome = game.oMove(x, y);
                   
                   $(eventTrigger).html($('<p class="piece">O</p>'));
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
        $tile.html('');
        $tile.on('click', function() {
            newGame(this)
        });

        $results = $('.results h3');
        if (xTurn) {
            $results.text(`X plays first...`)
        } else {
            $results.text(`O plays first...`)
        };

        $('.rematch').toggleClass('hidden'); // Hide rematch button
    });

});

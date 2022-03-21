let xTurn = true; // Boolean to track player turns.

$(document).ready(function() {

    $('.tile').on('click', function() {
        const $tile = $(this);
    
        // Check class for coordinates of clicked node.
        const x = $tile[0].classList[1][1];
        const y = $tile[0].classList[2][1];
    
        // Run move function with coordinates the insert piece into node
        if (!$tile.text()) {
    
            if (xTurn) {
                const outcome = game.xMove(x, y);

                $(this).html($('<p class="piece">X</p>'));
                $('.results').html(`<h3>${outcome.message}</h3>`);
    
                // Game Over, stop listener
                if (outcome.gameOver) {
                    $('.tile').off();
                };
    
            } else {
                const outcome = game.oMove(x, y);
                
                $(this).html($('<p class="piece">O</p>'));
                $('.results').html(`<h3>${outcome.message}</h3>`);

                // Game Over, stop listener
                if (outcome.gameOver) {
                    $('.tile').off();
                };
    
            };

            xTurn = !xTurn;
            
        };

    });

});

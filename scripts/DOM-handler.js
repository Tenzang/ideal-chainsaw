console.log('DOM-handler connected');
let turn = true;

$('.tile').on('click', function() {
    const $tile = $(this);

    // Check class for coordinates of clicked node.
    const x = $tile[0].classList[1][1];
    const y = $tile[0].classList[2][1];
    console.log("coordinates:", x, ",", y);

    // Run move function with coordinates the insert piece into node
    if (!$tile.text()) {

        if (turn) {
            const outcome = game.xMove(x, y);
            $(this).html($('<p class="piece">X</p>'));
            $('.results').text(outcome.message);
            console.log(outcome);

            // Game Over, stop listener
            if (outcome.gameOver) {
                $('.tile').off();
            };

        } else {
            const outcome = game.oMove(x, y);
            $(this).html($('<p class="piece">O</p>'));
            $('.results').text(outcome.message);
            console.log(outcome);

            // Game Over, stop listener
            if (outcome.gameOver) {
                $('.tile').off();
            };

        };
        turn = !turn;
    };
});
**Ideal Chainsaw** 
<br>
(*Tic-Tac-Toe*)
===============================================================================

## **About the application:**
-------------------------------------------------------------------------------
### This application uses:
- *HTML*
- *CSS*
- *Javascript (+jQuery)*

### The Business Logic:
*This section is coming soon...*

### DOM-Manipulation:
*This section is coming soon...*

## **Game Features:**
-------------------------------------------------------------------------------
In **Tic-Tac-Toe**, players take turns to place pieces on a *3 x 3 grid*. If a player places three pieces in a *straight line*, they win the game. The game ends in a *draw* if there are no spaces left on the grid and no player has won.

In this iteration of Tic-Tac-Toe, you may play multiple *rounds*. A *score* is tracked on either side of the grid.

By default the game is set to **2-player** mode.

To change the *game mode* to **player vs AI**:
- Press the ***space*** key to access the menu.
- Select the **AI** option.
- Select an **AI difficulty**.

The *AI* will then assume the role of the *"O" player*.

### AI Behaviour
- **Hugh** *(easy)* will randomely select empty grid positions to play to.
- **Carter** *(medium)* will prioritize his moves as follows:
1. Plays to positions that win him the game.
2. Plays to positions that block the player from winning.
3. Selects a random position to play to.
* **Joel** *(hard)* will never let you win, he's much too stubborn.

Things to note when selecting *AI* mode:
- If you select the *AI* setting on an *"O"* turn, the *AI* will not immediately make a move. You will need to make an initial *"O"* move on their behalf.
- While in default mode the first *player* will alternate on a rematch, in *AI* mode the *AI* will be forced to play second. This can be circumvented if the *player* switches to *AI mode* in a game where it's *"O"'s* turn to play first however as mentioned above the *AI* will not play the **first** move.
-------------------------------------------------------------------------------

**Click *[here](https://tenzang.github.io/ideal-chainsaw/)* to play the game.**

-------------------------------------------------------------------------------

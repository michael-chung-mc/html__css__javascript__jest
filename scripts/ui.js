const player = require('./player.js');
const gb = require('./gameBoard.js')

function uiFactory () {
    let ui = {
        boardOne : gb(10,10),
        boardTwo : gb(10,10),
        playerOne : player(this.boardOne, this.boardTwo),
        playerTwo : player(this.boardTwo,this.boardOne),
        reset : function () {
            this.boardOne = gb(10,10);
            this.boardTwo = gb(10,10);
            this.playerOne = player(this.boardOne, this.boardTwo);
            this.playerTwo = player(this.boardTwo, this.boardOne);
        },
    }
    return ui;
}
module.exports = uiFactory;
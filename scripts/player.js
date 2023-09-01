function playerFactory (myBoard, opponentBoard) {
    let player = {
        board : myBoard,
        opponent : opponentBoard,
        makeMove : function (x,y) {
            return this.opponent.receiveAttack(x,y);
        },
        autoMove : function () {
            let x = Math.floor(Math.random()*(this.opponent.getWidth()+1));
            let y = Math.floor(Math.random()*(this.opponent.getHeight()+1));
            while (!this.opponent.checkValidMove(x,y))
            {
                x = Math.floor(Math.random()*(this.opponent.getWidth()+1));
                y = Math.floor(Math.random()*(this.opponent.getHeight()+1));
            }
            return this.makeMove(x,y);
        },
    }
    return player;
}

module.exports = playerFactory;
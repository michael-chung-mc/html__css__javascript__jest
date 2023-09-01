const board = require('./board.js');
const ship = require('./ship.js');

function gameboardFactory (height, width) {
    let gameboard = {
        b : new board(height, width),
        ships : new Map (),
        checkValidMove : function (x,y) {
            return !(this.b.getMarked(x,y));
        },
        getWidth : function () { return this.b.getWidth(); },
        getHeight : function () { return this.b.getHeight(); },
        setShip : function (startX, startY, exclusiveEndX, exclusiveEndY)
        {
            if (startX > exclusiveEndX || startY > exclusiveEndY
                || startX < 0 || startY < 0 || startX > this.getWidth() || startY > this.getHeight()
                || exclusiveEndX < 0 || exclusiveEndY < 0 || exclusiveEndX > this.getWidth() || exclusiveEndY > this.getHeight()
                || (startX != exclusiveEndX && startY != exclusiveEndY)
                )
            {
                console.error("invalid positioning");
                return null;
            }
            let length = 0;
            let coords = [];
            if (startX == exclusiveEndX)
            {
                for (let i = startY; i < exclusiveEndY; i++)
                {
                    coords.push([startX, i]);
                }
                length = exclusiveEndY-startY;
            }
            else if (startY == exclusiveEndY)
            {
                for (let i = startX; i < exclusiveEndX; i++)
                {
                    coords.push([i,startY]);
                }
                length = exclusiveEndX-startX;
            }
            else
            {
                console.error("invalid positioning");
                return null;
            }
            this.ships.set(ship(length), coords);
        },
        getShip : function (x,y)
        {
            let found = null;
            for (const key of this.ships.keys())
            {
                coords = this.ships.get(key);
                for (let i = 0; i < coords.length; i++)
                {
                    if (coords[i][0] == x && coords[i][1] == y)
                    {
                        found = key;
                    }
                }
            }
            return found;
        },
        receiveAttack : function (x,y)
        {
            if (this.checkValidMove(x,y))
            {
                let target = this.getShip(x,y);
                if (target != null)
                {
                    target.hit();
                }
                this.b.setMark(x,y);
                return true;
            }
            return false;
        },
        battleReport : function () {
            let sunk = [];
            let alive = [];
            for (const key of this.ships.keys())
            {
                if (key.isSunk())
                {
                    sunk.push(key);
                }
                else
                {
                    alive.push(key)
                }
            }
            return alive.length == 0;
        }
    }
    return gameboard;
}

module.exports = gameboardFactory;
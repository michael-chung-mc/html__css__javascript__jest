function shipFactory (length) {
    var ship = {
        length : length,
        health : length,
        sunk : false,
        getLength : function () { return this.length; },
        getHealth : function () { return this.health; },
        getSunk : function () { return this.sunk; },
        hit : function () {
            this.health - 1 < 0 ? this.health = 0 : this.health -= 1;
            this.isSunk();
        },
        isSunk : function () {
            if (this.health == 0)
            {
                this.sunk = true;
            }
            return this.sunk;
        },
    }
    return ship;
}

module.exports = shipFactory;
function boardFactory (height, width) {
    var board = {
        mark : "X",
        emptyMark : "-",
        grid : (() => {
            let arr = []
            for (let i = 0; i < width; i++)
            {
                arr.push([])
                for (let j = 0; j < height; j++)
                {
                    arr[i].push(this.emptyMark);
                }
            }
            return arr;
        })(),
        getWidth : function () { return this.grid.length; },
        getHeight : function () { return this.grid[0].length; },
        validPosition : function (x,y) {
            return this.grid != null && x >= 0 && x < this.getWidth() && y >= 0 && y <= this.getHeight();
        },
        getMark : function (x,y) {
            if (this.validPosition(x,y))
            {
                return this.grid[x][y];
            }
            return null;
        },
        getMarked : function (x,y) {
            return this.getMark(x,y) == this.mark
        },
        setMark : function (x,y) {
            if (this.validPosition(x,y))
            {
                this.grid[x][y] = this.mark;
                return true;
            }
            return false;
        },
        setMarkToggle : function (x,y) {
            if (this.validPosition(x,y))
            {
                this.getMark(x,y) == this.mark ? this.grid[x][y] = this.emptyMark : this.grid[x][y] = this.mark;
                return true;
            }
            return false;
        },
    }
    return board;
}

module.exports = boardFactory;
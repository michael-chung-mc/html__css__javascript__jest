const board = (() => {
    let marks = [" ", "O", "X"];
    let grid = [[marks[0],marks[0],marks[0]],[marks[0],marks[0],marks[0]],[marks[0],marks[0],marks[0]]];
    function getBoard () {
       return grid;
    }
    function isBoardFull () {
        return (grid[0][0] != marks[0]
            & grid[0][1] != marks[0]
            & grid[0][2] != marks[0]
            & grid[1][0] != marks[0]
            & grid[1][1] != marks[0]
            & grid[1][2] != marks[0]
            & grid[2][0] != marks[0]
            & grid[2][1] != marks[0]
            & grid[2][2] != marks[0])
    }
    function getEmptyMark () {
        return marks[0];
    }
    function getPlayerOneMark () {
        return marks[1];
    }
    function getPlayerTwoMark () {
        return marks[2];
    }
    function getCell (x,y) {
        if (x >= grid.length || y >= grid[0].length || x < 0 || y < 0)
        {
            return false;
        }
        return grid[x][y];
    }
    function getColumnWin() {
        if (getCell(0,0) == getCell(0,1) & getCell(0,1) == getCell(0,2))
        {
            console.log(grid[0][0] + " | " + grid[0][1] + " | " + grid[0][2]);
            return getCell(0,0);
        }
        else if (getCell(1,0) == getCell(1,1) & getCell(1,1) == getCell(1,2))
        {
            console.log(grid[1][0] + " | " + grid[1][1] + " | " + grid[1][2]);
            return getCell(1,0);
        }
        else if (getCell(2,0) == getCell(2,1) & getCell(2,1) == getCell(2,2))
        {
            console.log(grid[2][0] + " | " + grid[2][1] + " | " + grid[2][2]);
            return getCell(2,0);
        }
        return getEmptyMark();
    }
    function getRowWin() {
        if (getCell(0,0) == getCell(1,0) & getCell(1,0) == getCell(2,0))
        {
            console.log(grid[0][0] + " | " + grid[1][0] + " | " + grid[2][0]);
            return getCell(0,0);
        }
        else if (getCell(0,1) == getCell(1,1) & getCell(1,1) == getCell(2,1))
        {
            console.log(grid[0][1] + " | " + grid[1][1] + " | " + grid[2][1]);
            return getCell(0,1);
        }
        else if (getCell(0,2) == getCell(1,2) & getCell(1,2) == getCell(2,2))
        {
            console.log(grid[0][2] + " | " + grid[1][2] + " | " + grid[2][2]);
            return getCell(0,2);
        }
        return getEmptyMark();
    }
    function getDiagonalWin () {
        if (getCell(0,0) == getCell(1,1) & getCell(1,1) == getCell(2,2))
        {
            console.log(grid[0][0] + " | " + grid[1][1] + " | " + grid[2][2]);
            return getCell(0,0);
        }
        else if (getCell(0,2) == getCell(1,1) & getCell(1,1) == getCell(2,0))
        {
            console.log(grid[0][2] + " | " + grid[1][1] + " | " + grid[2][0]);
            return getCell(0,2);
        }
        return getEmptyMark();
    }
    function getState () {
        console.log(grid);
        let rowWin = getRowWin();
        let columnWin = getColumnWin();
        let diagonalWin = getDiagonalWin();
        if (rowWin != getEmptyMark()) {
            console.log(rowWin + " won the row")
            return rowWin;
        }
        else if (columnWin != getEmptyMark()) {
            console.log(columnWin + " won the column")
            return columnWin;
        }
        else if (diagonalWin != getEmptyMark()) {
            console.log(diagonalWin + " won diagonally")
            return diagonalWin;
        }
        else {
            return getEmptyMark();
        }
    }
    function getTie () {
        return isBoardFull();
    }
    function setValue (mark, x, y) {
        // console.log("Setting Value:");
        // console.log(grid);
        // console.log(mark);
        // console.log(x);
        // console.log(y);
        // console.log(marks);
        if (grid[x][y] == getEmptyMark())
        {
            // console.log("position" + x + "," + y + " is marked");
            grid[x][y] = mark;
            return true;
        }
        else {
            // console.log("position" + x + "," + y + " is occupied");
            return false;
        }
    }
    function clearGrid () {
        for (let i = 0; i < grid.length; i++){
            for (let j = 0; j < grid.length; j++){
                grid[i][j] = getEmptyMark();
            }
        }
    }
    return {
        getBoard,
        getEmptyMark,
        getPlayerOneMark,
        getPlayerTwoMark,
        getCell,
        getState,
        getTie,
        setValue,
        clearGrid
    }
})();

// const playerFactory = (username, mark) => {
//     let playerName = username;grid
//     let playerMark = mark;
//     function getName() {return playerName};
//     function getMark() {return playerMark};
//     function setName(newName) {playerName = newName};
//     return (getName, getMark, setName);
// // };

//playerName is not defined
// function playerFactory(username, mark) {
//     console.log(username);
//     console.log(mark);
//     return {
//         playerName : username,
//         playerMark : mark,
//         getName: function() {return playerName;},
//         getMark: function() {return playerMark;},
//         setName: function(newName) {playerName = newName;}
//     };
// }
const bot = ((botmark) => {
    let mark = botmark
    function getMark ()
    {
        return mark;
    }
    function scoreRow (x,y)
    {
        let win = 0;
        let tie = 0;
        let grid = board.getBoard();
        for (let i = 0; i < grid.length; i++) {
            if (i != x)
            {
                if (board.getCell(i,y)==mark)
                {
                    win += 2;
                }
                else if (board.getCell(i,y)!=board.getEmptyMark())
                {
                    tie += 2;
                }
            }
        }
        if (win > tie) { return win; }
        else { return tie; }
    }
    function scoreColumn (x,y)
    {
        let win = 0;
        let tie = 0;
        let grid = board.getBoard();
        for (let i = 0; i < grid.length; i++) {
            if (i != y)
            {
                if (board.getCell(x,i)==mark)
                {
                    // chase win
                    win += 2;
                }
                else if (board.getCell(x,i)!=board.getEmptyMark())
                {
                    // stop loss
                    tie += 2;
                }
            }
        }
        if (win > tie) { return win; }
        else { return tie; }
    }
    function scoreDiagonal (x,y)
    {
        if ((x == 1 && y == 0) || (x==0 && y ==1) || (x==1 && y==2) || (x==2 && y==1))
        {
            return 0;
        }
        let win = 0;
        let tie = 0;
        let leftUpperDiagonal = board.getCell(x-1,y-1);
        let leftUpperMostDiagonal = board.getCell(x-2,y-2);
        let leftLowerDiagonal = board.getCell(x-1,y+1);
        let leftLowerMostDiagonal = board.getCell(x-2,y+2);
        let rightLowerDiagonal = board.getCell(x+1,y+1);
        let rightLowerMostDiagonal = board.getCell(x+2,y+2);
        let rightUpperDiagonal = board.getCell(x+1,y-1);
        let rightUpperMostDiagonal = board.getCell(x+2,y-2);
        if ( leftUpperDiagonal != false)
        {
            if (leftUpperDiagonal == mark) { win += 2; }
            else if (leftUpperDiagonal!=board.getEmptyMark()) { tie += 2; }
        }
        if ( leftUpperMostDiagonal != false)
        {
            if (leftUpperMostDiagonal == mark) { win += 2; }
            else if (leftUpperMostDiagonal!=board.getEmptyMark()) { tie += 2; }
        }
        if (leftLowerDiagonal != false)
        {
            if (leftLowerDiagonal == mark) { win += 2; }
            else if (leftLowerDiagonal!=board.getEmptyMark()) { tie += 2; }
        }
        if (leftLowerMostDiagonal != false)
        {
            if (leftLowerMostDiagonal == mark) { win += 2; }
            else if (leftLowerMostDiagonal!=board.getEmptyMark()) { tie += 2; }
        }
        if (rightLowerMostDiagonal != false)
        {
            if (rightLowerMostDiagonal == mark) { win += 2; }
            else if (rightLowerMostDiagonal!=board.getEmptyMark()) { tie += 2; }
        }
        if (rightLowerDiagonal != false)
        {
            if (rightLowerDiagonal == mark) { win += 2; }
            else if (rightLowerDiagonal!=board.getEmptyMark()) { tie += 2; }
        }
        if (rightUpperDiagonal != false)
        {
            if (rightUpperDiagonal == mark) { win += 2; }
            else if (rightUpperDiagonal!=board.getEmptyMark()) { tie += 2; }
        }
        if (rightUpperMostDiagonal != false)
        {
            if (rightUpperMostDiagonal == mark) { win += 2; }
            else if (rightUpperMostDiagonal!=board.getEmptyMark()) { tie += 2; }
        }
        if (win > tie) { return win; }
        else { return tie; }
    }
    function minmax () {
        let bestMove = [1,1]
        let scoreMove = [0,1,1];
        let grid = board.getBoard();
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (board.getCell(i,j) == board.getEmptyMark())
                {
                    console.log(i + ":" + j)
                    let maxScore = scoreRow(i,j);
                    console.log("row" + maxScore)
                    let columnScore = scoreColumn(i,j);
                    console.log("column" + columnScore)
                    let diagonalScore = scoreDiagonal(i,j);
                    console.log("diagonal" + diagonalScore)
                    if (maxScore < columnScore) { maxScore = columnScore; }
                    if (maxScore < diagonalScore) {maxScore = diagonalScore; }
                    if (maxScore > scoreMove[0])
                    {
                        scoreMove = [maxScore, i,j];
                        bestMove[0] = i;
                        bestMove[1] = j;
                    }
                }
            }
        }
        console.log("odin-bot is thinking ... " + bestMove);
        return bestMove;
    }
    function setMark(botmark) {
        mark = botmark
    }
    return {
        getMark,
        minmax,
        setMark
    }
})

var playerFactory = function(username, mark) {
    console.log(username);
    console.log(mark);
    var player = {};
    player.playerName = username,
    player.playerMark = mark,
    player.getName = function() {return player.playerName;},
    player.getMark = function() {return player.playerMark;},
    player.setName = function(newName) {player.playerName = newName;}
    return player;
}

const manager = (() => {
    let odinBot = null;
    let playerOne = playerFactory(board.getPlayerOneMark(),board.getPlayerOneMark());
    console.log(playerOne.getName());
    console.log(playerOne.getMark());
    let playerTwo = playerFactory(board.getPlayerTwoMark(),board.getPlayerTwoMark());
    console.log(playerTwo.getName());
    console.log(playerTwo.getMark());
    let currentPlayer = playerOne;
    document.getElementById("reset_game_button").addEventListener("click", () => {
        board.clearGrid();
        currentPlayer = playerOne;
        updateScreen();
    });
    document.getElementById("player_1_name").addEventListener("input", (event) => {
        playerOne.setName(event.target.value);
        updateScreen();
    });
    document.getElementById("player_2_name").addEventListener("input", (event) => {
        playerTwo.setName(event.target.value);
        updateScreen();
    });
    document.getElementById("odin_bot_toggle_o").addEventListener("click", (event) => {
        odinBot = bot(board.getPlayerOneMark());
        playerOne.setName("odin-bot");
        document.getElementById("player_1_name").value = playerOne.getName();
        if (currentPlayer.getMark() == odinBot.getMark())
        {
            placeMarker(1,1);
            switchPlayer();
            updateScreen();
        }
    });
    document.getElementById("odin_bot_toggle_x").addEventListener("click", (event) => {
        odinBot = bot(board.getPlayerTwoMark());
        playerTwo.setName("odin-bot");
        document.getElementById("player_2_name").value = playerTwo.getName();
        if (currentPlayer.getMark() == odinBot.getMark())
        {
            placeMarker(1,1);
            switchPlayer();
            updateScreen();
        }
    });
    function switchPlayer()
    {
        if (currentPlayer.getMark() == playerOne.getMark()) {
            currentPlayer = playerTwo;
        }
        else{
            currentPlayer = playerOne;
        }
    }
    function placeMarker (x, y) {
        if (odinBot != null){
            // bot is active
            if (currentPlayer.getMark() == odinBot.getMark())
            {
                let move = odinBot.minmax();
                return board.setValue(odinBot.getMark(), move[0], move[1]);
            }
            else {
                return board.setValue(currentPlayer.getMark(), x, y);
            }
        }
        else {
            return board.setValue(currentPlayer.getMark(), x, y);
        }
    }
    function makeMove (x, y) {
        return () =>
        {
            placeMarker(x,y);
            switchPlayer();
            if (odinBot != null && currentPlayer.getMark() == odinBot.getMark())
            {
                placeMarker(x,y);
                switchPlayer();
            }
            updateScreen();
        }
    }
    function updateScreen() {
        let gameboard = board.getBoard();
        let contentDiv = document.getElementById("content_container");
        let statusDiv = document.getElementById("status_header");
        // clear old
        while (contentDiv.firstChild) {
            contentDiv.removeChild(contentDiv.firstChild);
        }
        // set new
        for (let i = 0; i < gameboard.length; i++) {
            let columnDiv = document.createElement("div");
            columnDiv.setAttribute("id", "board_column");
            columnDiv.style.gridColumn = i + 1;
            for (let j = 0; j < gameboard[i].length; j++) {
                let cell = document.createElement("button");
                cell.setAttribute("type", "button");
                cell.setAttribute("id", "board_cell");
                // cell.setAttribute("class", "x" + i);
                // cell.setAttribute("class", "y" + j);
                cell.innerHTML = gameboard[i][j];
                cell.addEventListener("click", makeMove(i, j));
                columnDiv.appendChild(cell);
            }
            contentDiv.appendChild(columnDiv);
        }
        // status of game
        let win = board.getState();
        if (win == board.getEmptyMark())
        {
            if (board.getTie())
            {
                statusDiv.innerHTML = "Tie!";
            }
            else
            {
                statusDiv.innerHTML = currentPlayer.getName() + "'s Turn";
            }
        }
        else
        {
            statusDiv.innerHTML = win + " won! Congratulations!";
        }
    }
    return {
        updateScreen
    }
})();

manager.updateScreen();
function colorGradientQuestion () {
    let varDomCanvas;
    let varDomOptions;
    let varDomScore;
    let varDomTimerLimit;
    let varDomGrid;
    let varDomColorRange;

    let varTimer;
    let varTimerIncrement = 1000;
    let varTimerLimit = 180;

    let varGrid;
    let varWidth;
    let varHeight;
    let varRows = 8;
    let varColumns = 8;
    let varAnswerGrid;

    let varCellHeight = 64;
    let varCellWidth = 64;

    let varColorDefault = "rgb(0,0,0)";
    let varColorRange = [{red:255,green:255,blue:255},{red:0,green:0,blue:0}];

    let varCellPicked = {x:null,y:null,color:null};

    let varScore;

    function init (argDomCanvas, argDomOptions, argDomScoreBoard, argDomTimer) {
        varDomCanvas = argDomCanvas;
        varDomOptions = argDomOptions;
        varDomScore = argDomScoreBoard;

        varDomColorRange = document.createElement("div");
        varDomColorRange.id = "option-color-range";
        varDomOptions.appendChild(varDomColorRange);

        let varDomOption = document.createElement("div")
        varDomOption.classList.add("option");
        varDomText = document.createElement("div");
        varDomText.innerHTML = "Time Limit:";
        varDomOption.appendChild(varDomText);
        varDomTimerLimit = document.createElement("input");
        varDomTimerLimit.id = "option-timer-limit";
        varDomTimerLimit.defaultValue = varTimerLimit;
        varDomTimerLimit.addEventListener("input", (e)=>{updateTimerLimit(e.target.value)});
        varDomOption.appendChild(varDomTimerLimit);
        varDomOptions.appendChild(varDomOption);
        varTimer = ticker();
        varTimer.init(varTimerIncrement, argDomTimer);

        varDomGrid = document.createElement("section");
        varDomGrid.classList.add("grid");
        varDomCanvas.appendChild(varDomGrid);
        setGrid();
        shuffleGrid();

        window.onresize = () => {
            setGridDimensions();
            render();
        }

        render();
    }
    function updateTimerLimit(value)
    {
        varTimerLimit = value > 0 ? value : varTimerLimit;
        render();
    }
    function setGrid () {
        varGrid = [];
        for (let i = 0; i < varRows; i++)
        {
            varGrid.push([]);
            for (let j = 0; j < varColumns; j++)
            {
                varGrid[i].push(varColorDefault);
            }
        }
        setGridDimensions();
        setGridColor();
        varAnswerGrid = [];
        for (let i = 0; i < varRows; i++)
        {
            varAnswerGrid.push([]);
            for (let j = 0; j < varColumns; j++)
            {
                varAnswerGrid[i][j] = varGrid[i][j];
            }
        }
    }
    function setGridDimensions () {
        //varDomCanvas = document.getElementById(varDomCanvas.id);
        varDomRect = varDomCanvas.getBoundingClientRect();
        console.log(`dom width:${varDomRect.width} dom height:${varDomRect.height}`);
        varWidth = Math.min(varDomRect.width, window.innerWidth);
        varWidth = varWidth == NaN || varWidth == undefined ? varCellWidth * varRows : varWidth;
        varHeight = Math.min(varDomRect.height, window.innerHeight);
        varHeight = varHeight == NaN || varHeight == undefined ? varCellHeight * varRows : varHeight;
        let varSquare = Math.min(varWidth, varHeight);
        console.log(`row width:${varWidth} height:${varHeight}`);
        varCellWidth = parseInt(varSquare/varColumns);
        varCellHeight = parseInt(varSquare/varRows);
        console.log(`cell height:${varCellHeight} width:${varCellWidth}`);
    }
    function setGridColor () {
        let n = varRows * varColumns;
        let c = color();
        for (let i = 0; i < varRows; i++)
        {
            for (let j = 0; j < varColumns; j++)
            {
                let shade = c.gradient(varColorRange[0],varColorRange[1],(i*varRows+j)/n)
                //console.log((i*varRows+j)/n);
                setCellColorRGB(i,j,`rgb(${shade.r},${shade.g},${shade.b})`);
                //console.log(`rgb(${shade.r},${shade.g},${shade.b})`);
            }
        }
    }
    function setCellColorRGB (x,y,color) {
        if (x >= 0 && x < varRows && y >= 0 && y < varColumns)
        {
            varGrid[x][y] = color;
        }
    }
    function swapCellColor (startX, startY, targetX,targetY) {
        let varToSwap = varGrid[startX][startY];
        setCellColorRGB(startX,startY,varGrid[targetX][targetY]);
        setCellColorRGB(targetX,targetY,varToSwap);
        render();
    }
    function shuffleGrid ()
    {
        for (let i = 0; i < varRows; i++)
        {
            for (let j = 0; j < varColumns; j++)
            {
                if (Math.random()>.05)
                {
                    let x = i;
                    let y = j;
                    let targetX = parseInt(Math.random() * varRows);
                    targetX = targetX >= varRows ? 0 : targetX;
                    let targetY = parseInt(Math.random() * varColumns);
                    targetY = targetY >= varColumns ? 0 : targetY;
                    //console.log(`${i},${j} to ${targetX},${targetY}`)
                    swapCellColor (i,j,targetX,targetY);
                }
            }
        }
    }
    function render () {
        updateColorRange();
        while(varDomGrid.firstChild) {
            varDomGrid.removeChild(varDomGrid.firstChild);
        }
        renderGrid();
    }
    function renderGrid ()
    {
        for (let i = 0; i < varRows; i++)
        {
            let varDomRow = document.createElement("div");
            varDomRow.classList.add('row');
            varDomRow.style.width = `${varWidth}px`;
            varDomRow.style.height = `${varCellHeight}px`;
            for (let j = 0; j < varColumns; j++)
            {
                let varDomCell = document.createElement("div");
                varDomCell.classList.add('cell');
                varDomCell.style.backgroundColor = varGrid[i][j];
                varDomCell.style.height = `${varCellHeight}px`;
                varDomCell.style.width = `${varCellWidth}px`;
                varDomCell.addEventListener('click', () => {pickCell(i,j)});
                varDomRow.append(varDomCell);
            }
            varDomRow.style.gridTemplateColumns="1fr autofit";
            varDomGrid.append(varDomRow);
        }
    }
    function updateColorRange()
    {
        while(varDomColorRange.firstChild)
        {
            varDomColorRange.removeChild(varDomColorRange.firstChild);
        }
        let varDomOption = document.createElement("div")
        varDomOption.classList.add("option");
        let varDomText = document.createElement("div");
        varDomText.innerHTML = "RGB Gradient Range:";
        varDomOption.appendChild(varDomText);
        for (let i = 0; i < varColorRange.length; i++)
        {
            let varDomColor = document.createElement("input");
            varDomColor.className = "range-input";
            varDomColor.id = "option-color-range-"+i;
            varDomColor.addEventListener("focusout", (e)=>{updateColor(i, e.target.value)});
            varDomColor.defaultValue = `${varColorRange[i].red},${varColorRange[i].green},${varColorRange[i].blue}`;
            varDomColor.style.width = varDomColor.defaultValue.length + 'ch';
            varDomOption.appendChild(varDomColor);
        }
        varDomColorRange.appendChild(varDomOption);
    }
    function updateColor(index, color)
    {
        //console.log(color);
        if (color.match(/\d*,\d*,\d/))
        {
            let split = color.split(",");
            varColorRange[index] = {red:split[0], green:split[1], blue:split[2]};
            //console.log(`${varColorRange[index]}`);
            setGrid();
            shuffleGrid();
            varTimer.stop();
            render();
        }
    }
    function pickCell(x,y)
    {
        if (varCellPicked.x!=null && varCellPicked.y!=null
            && (varCellPicked.x != x || varCellPicked.y !=y))
        {
            swapCellColor(varCellPicked.x,varCellPicked.y,x,y);
            varCellPicked = {x:null,y:null,color:null};
            //console.log(`pick cell swapped`);
            if (varTimer.getTick() === 0)
            {
                varTimer.start(varTimerLimit);
                resetScore();
            }
            updateScore();
        } else {
            varCellPicked = {x:x, y:y, color:varGrid[x][y]};
            console.log(`${varCellPicked.color}`);
        }
    }
    function resetScore() {
        varScore = 0;
    }
    function updateScore() {
        checkScore();
        varDomScore.innerHTML = "score:" + varScore;
    }
    function checkScore () {
        resetScore();
        for (let i = 0; i < varRows; i++)
        {
            for (let j = 0; j < varColumns; j++)
            {
                varScore += varGrid[i][j] === varAnswerGrid[i][j] ? 1 : 0;
                //console.log(`${varGrid[i][j]} == ${varAnswerGrid[i][j]}`);
            }
        }
    }
    function stop ()
    {
        varTimer.stop();
    }
    return {
        init,
        stop,
    }
}
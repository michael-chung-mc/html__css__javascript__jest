function colorQuestion () {
    //const button = document.querySelector('button');
    let varDomCanvas;
    let varDomGrid;
    
    let varGrid;
    let varWidth;
    let varHeight;
    let varRows = 8;
    let varColumns = 8;

    let varCellHeight = 64;
    let varCellWidth = 64;

    let varColorDefault = "rgb(0,0,0)";
    let varColorStart = {red:255,green:255,blue:255};
    let varColorEnd = {red:0,green:0,blue:0};

    function init (argDomCanvas, argDomOptions, argDomScoreBoard, argDomTimer) {
        varDomCanvas = argDomCanvas;

        varDomGrid = document.createElement("section");
        varDomGrid.classList.add("grid");
        varDomCanvas.appendChild(varDomGrid);

        setGrid();
        shuffleGrid();
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
    }
    function setGridDimensions () {
        varDomCanvas = document.getElementById(varDomCanvas.id);
        varDomRect = varDomCanvas.getBoundingClientRect();
        console.log(varDomCanvas);
        varWidth = varDomRect.width;
        varWidth = varWidth == NaN || varWidth == undefined ? varCellWidth * varRows : varWidth;
        varHeight = varDomRect.height;
        varHeight = varHeight == NaN || varHeight == undefined ? varCellHeight * varRows : varHeight;
        let varSquare = Math.min(varWidth, varHeight);
        console.log(`row width:${varWidth} height:${varHeight}`);
        varCellHeight = parseInt(varSquare/varColumns);
        varCellWidth = parseInt(varSquare/varRows);
        console.log(`cell height:${varCellHeight} width:${varCellWidth}`);
    }
    function setGridColor () {
        let n = varRows * varColumns;
        let c = color();
        for (let i = 0; i < varRows; i++)
        {
            for (let j = 0; j < varColumns; j++)
            {
                let shade = c.gradient(varColorStart,varColorEnd,(i*varRows+j)/n)
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
                    console.log(`${i},${j} to ${targetX},${targetY}`)
                    let varToSwap = varGrid[i][j];
                    setCellColorRGB(i,j,varGrid[targetX][targetY]);
                    setCellColorRGB(targetX,targetY,varToSwap);
                }
            }
        }
    }
    function render () {
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
            varDomRow.style.height = `${varCellHeight}px`;
            for (let j = 0; j < varColumns; j++)
            {
                let varDomCell = document.createElement("div");
                varDomCell.classList.add('cell');
                varDomCell.style.backgroundColor = varGrid[i][j];
                varDomCell.style.height = `${varCellHeight}px`;
                varDomCell.style.width = `${varCellWidth}px`;
                //box.addEventListener('mouseover', (event) => {shadeCell(event)});
                varDomRow.append(varDomCell);
            }
            varDomRow.style.gridTemplateColumns="1fr autofit";
            varDomGrid.append(varDomRow);
        }
    }
    function stop ()
    {

    }
    return {
        init,
        stop,
    }
}
function color ()
{
    function gradient(startRGB, endRGB, step)
    {
        let r = endRGB.red - startRGB.red;
        let g = endRGB.green - startRGB.green;
        let b = endRGB.blue - startRGB.blue;
        r = (r * step) + startRGB.red;
        g = (g * step) + startRGB.green;
        b = (b * step) + startRGB.blue;
        return {r,g,b};
    }
    return {
        gradient,
    }
}
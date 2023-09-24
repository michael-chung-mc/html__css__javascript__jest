function colorQuestion () {
    //const button = document.querySelector('button');
    let varDomCanvas;
    let varDomGrid;
    
    let varGrid;
    let varWidth;
    let varHeight;
    let varRows = 8;
    let varColumns = 8;
    // const sizeDefault = 16;
    // const sizeMax = 101;
    // const sizeMin = 20;

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
                console.log((i*varRows+j)/n);
                setCell(i,j,`rgb(${shade.r},${shade.g},${shade.b})`);
                console.log(`rgb(${shade.r},${shade.g},${shade.b})`);
            }
        }
    }
    function setCell (x,y,color) {
        if (x >= 0 && x < varRows && y >= 0 && y < varColumns)
        {
            varGrid[x][y] = color;
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
    
    // function shadeCell (event) {
    //     let cell = event.target;
    //     const currentColor = cell.style.backgroundColor;
    //     if (cellShadeOption == 0) {
    //         if (currentColor != "black")
    //         {
    //             cell.style.backgroundColor = `rgba(0,0,0, 1.0)`;
    //             console.log(`${cell.style.opacity}`);
    //         }
    //     }
    //     else if (cellShadeOption == 1) {
    //         const randomRed = Math.floor(Math.random() * (256));
    //         const randomBlue = Math.floor(Math.random() * (256));
    //         const randomGreen = Math.floor(Math.random() * (256));
    //         cell.style.backgroundColor = `rgba(${randomRed},${randomBlue},${randomGreen}, 1.0)`;
    //         console.log(`${cell.style.opacity}`);
    //     }
    //     else if (cellShadeOption == 2) {
    //         console.log("base");
    //         console.log(`${cell.style.backgroundColor}`);
    //         console.log(`${cell.style.opacity}`);
    //         cell.style.opacity = parseFloat(cell.style.opacity) + 0.1;
    //         console.log("set");
    //         console.log(`${cell.style.backgroundColor}`);
    //         console.log(`${cell.style.opacity}`);
    //     }
    //     else {
    //         console.log("ShadeCell: Unsupported cell shade option")
    //     }
    // }
    
    // function initializeOpacity () {
    //     let rows = grid.children;
    //     for (let i = 0; i < rows.length; i++)
    //     {
    //         let cells = rows[i].children;
    //         for (let j = 0; j < cells.length; j++)
    //         {
    //             cells[j].style.backgroundColor = `rgb(0,0,0)`;
    //             cells[j].style.opacity = 0.0;
    //         }
    //     }
    // }
    
    // function maximizeOpacity () {
    //     let rows = grid.children;
    //     for (let i = 0; i < rows.length; i++)
    //     {
    //         let cells = rows[i].children;
    //         for (let j = 0; j < cells.length; j++)
    //         {
    //             cells[j].style.backgroundColor = `rgb(255,255,255)`;
    //             cells[j].style.opacity = 1.0;
    //         }
    //     }
    // }
    
    
    
    // //default grid
    // setGrid(sizeDefault,sizeDefault);
    // //display size
    // document.getElementById("boardSizeDisplay").innerHTML=`${sizeDefault} x ${sizeDefault}`;
    // //dynamically adjust grid size
    // window.addEventListener('resize', function(event) { 
    //     resizeGrid();
    // });
    
    // //let button resize and clear grid
    // const resizeButton = document.getElementById('resizeButton');
    // resizeButton.addEventListener('click', function(event) {
    //     let cellCount = prompt('Number of squares for new grid?')
    //     // handle improper
    //     if (cellCount > sizeMin && cellCount < sizeMax)
    //     {
    //         clearGrid();
    //         setGrid(cellCount, cellCount);
    //         if (cellShadeOption == 2)
    //         {
    //             initializeOpacity();
    //         }
    //         else
    //         {
    //             maximizeOpacity();
    //         }
    //         //display size
    //         document.getElementById("boardSizeDisplay").innerHTML=`${cellCount} x ${cellCount}`;
    //     }
    // });
    // //color button options
    // const bwButton = document.getElementById('buttonBW');
    // bwButton.addEventListener('click',function(event){
    //     cellShadeOption = 0;
    //     maximizeOpacity ();
    // });
    // const rgbButton = document.getElementById('buttonRandomColor');
    // rgbButton.addEventListener('click',function(event){
    //     cellShadeOption = 1;
    //     maximizeOpacity ();
    // });
    // const opacityButton = document.getElementById('buttonOpacity');
    // opacityButton.addEventListener('click',function(event){
    //     cellShadeOption = 2;
    //     initializeOpacity ();
    // });

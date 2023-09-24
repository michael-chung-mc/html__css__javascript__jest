function color () {
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
    let varDefaultCellColor = "rgb(0,0,0)";
    // let cellShadeOption = 0; // 0 = bw && 1 = color && 2 = opacity

    function init (argDomCanvas, argDomOptions, argDomScoreBoard, argDomTimer) {
        varDomCanvas = argDomCanvas;

        varDomGrid = document.createElement("section");
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
                varGrid[i].push(varDefaultCellColor);
            }
        }
        setGridDimensions();
    }
    function setGridDimensions () {
        varWidth = varDomCanvas.getOffsetWidth;
        varWidth = varWidth == NaN || varWidth == undefined ? varCellWidth * varRows : varWidth;
        varHeight = varDomCanvas.getOffsetHeight;
        varHeight = varHeight == NaN || varHeight == undefined ? varCellHeight * varRows : varHeight;
        //console.log(`row width:${varWidth} height:${varHeight}`);
        varCellHeight = parseInt(varHeight/varColumns);
        varCellWidth = parseInt(varWidth/varRows);
        //console.log(`cell height:${varCellHeight} width:${varCellWidth}`);
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
                varDomCell.style.color = varGrid[i][j];
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
}
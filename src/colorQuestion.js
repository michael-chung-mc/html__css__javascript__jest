function color () {
    const button = document.querySelector('button');
    const grid = document.querySelector('.grid');
    
    const sizeDefault = 16;
    const sizeMax = 101;
    const sizeMin = 20;

    let cellHeight = 8;
    let cellWidth = 8;
    let cellShadeOption = 0; // 0 = bw && 1 = color && 2 = opacity

    function synchGridRowDimensions () {
        const grid = document.getElementsByClassName('grid')[0];
        const rows = document.getElementsByClassName('row');
        const rowWidth = grid.offsetWidth;
        console.log(`${rowWidth} width`);
        cellHeight = rowWidth/rows.length;
        cellWidth = rowWidth/rows.length;
        console.log(`${cellHeight} height`);
    }
    
    function setGrid (rows, columns) {
        for (let i = 0; i < rows; i++)
        {
            var row = document.createElement("div")
            row.classList.add('row');
            grid.append(row);
            for (let j = 0; j < columns; j++)
            {
                let box = document.createElement("div");
                box.classList.add('square');
                box.addEventListener('mouseover', (event) => {shadeCell(event)});
                row.append(box);
            }
        }
        resizeGrid();
    }
    
    function shadeCell (event) {
        let cell = event.target;
        const currentColor = cell.style.backgroundColor;
        if (cellShadeOption == 0) {
            if (currentColor != "black")
            {
                cell.style.backgroundColor = `rgba(0,0,0, 1.0)`;
                console.log(`${cell.style.opacity}`);
            }
        }
        else if (cellShadeOption == 1) {
            const randomRed = Math.floor(Math.random() * (256));
            const randomBlue = Math.floor(Math.random() * (256));
            const randomGreen = Math.floor(Math.random() * (256));
            cell.style.backgroundColor = `rgba(${randomRed},${randomBlue},${randomGreen}, 1.0)`;
            console.log(`${cell.style.opacity}`);
        }
        else if (cellShadeOption == 2) {
            console.log("base");
            console.log(`${cell.style.backgroundColor}`);
            console.log(`${cell.style.opacity}`);
            cell.style.opacity = parseFloat(cell.style.opacity) + 0.1;
            console.log("set");
            console.log(`${cell.style.backgroundColor}`);
            console.log(`${cell.style.opacity}`);
        }
        else {
            console.log("ShadeCell: Unsupported cell shade option")
        }
    }
    
    function initializeOpacity () {
        let rows = grid.children;
        for (let i = 0; i < rows.length; i++)
        {
            let cells = rows[i].children;
            for (let j = 0; j < cells.length; j++)
            {
                cells[j].style.backgroundColor = `rgb(0,0,0)`;
                cells[j].style.opacity = 0.0;
            }
        }
    }
    
    function maximizeOpacity () {
        let rows = grid.children;
        for (let i = 0; i < rows.length; i++)
        {
            let cells = rows[i].children;
            for (let j = 0; j < cells.length; j++)
            {
                cells[j].style.backgroundColor = `rgb(255,255,255)`;
                cells[j].style.opacity = 1.0;
            }
        }
    }
    
    function clearGrid () {
        while(grid.firstChild) {
            grid.removeChild(grid.firstChild);
        }
    }
    
    function resizeGrid () {
        synchGridRowDimensions();
        let rows = grid.children;
        for (let i = 0; i < rows.length; i++)
        {
            let row = rows[i];
            row.style.height = `${cellHeight}px`;
            //console.log(`${row.style.height}`);
            let cells = row.children;
            for (let j = 0; j < cells.length; j++)
            {
                cells[j].style.width = `${cellWidth}px`;
            }
        }
    }
    
    //default grid
    setGrid(sizeDefault,sizeDefault);
    //display size
    document.getElementById("boardSizeDisplay").innerHTML=`${sizeDefault} x ${sizeDefault}`;
    //dynamically adjust grid size
    window.addEventListener('resize', function(event) { 
        resizeGrid();
    });
    
    //let button resize and clear grid
    const resizeButton = document.getElementById('resizeButton');
    resizeButton.addEventListener('click', function(event) {
        let cellCount = prompt('Number of squares for new grid?')
        // handle improper
        if (cellCount > sizeMin && cellCount < sizeMax)
        {
            clearGrid();
            setGrid(cellCount, cellCount);
            if (cellShadeOption == 2)
            {
                initializeOpacity();
            }
            else
            {
                maximizeOpacity();
            }
            //display size
            document.getElementById("boardSizeDisplay").innerHTML=`${cellCount} x ${cellCount}`;
        }
    });
    //color button options
    const bwButton = document.getElementById('buttonBW');
    bwButton.addEventListener('click',function(event){
        cellShadeOption = 0;
        maximizeOpacity ();
    });
    const rgbButton = document.getElementById('buttonRandomColor');
    rgbButton.addEventListener('click',function(event){
        cellShadeOption = 1;
        maximizeOpacity ();
    });
    const opacityButton = document.getElementById('buttonOpacity');
    opacityButton.addEventListener('click',function(event){
        cellShadeOption = 2;
        initializeOpacity ();
    });
}
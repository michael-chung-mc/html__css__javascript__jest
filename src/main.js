function init () {
    function dropdown (id) {
        return () => {
            console.log("down")
            let element = document.getElementById(id);
            element.classList.remove("invisible");
            element.classList.add("visible");
        }
    }
    function dropup (id)
    {
        return () => {
            console.log("up")
            let element = document.getElementById(id);
            element.classList.remove("visible");
            element.classList.add("invisible");
        }
    }
    let elems = document.getElementsByClassName("problem-tabs");
    for (let i = 0; i < elems.length; i++)
    {
        let childMenu = elems[i].getElementsByClassName("options")[0];
        elems[i].addEventListener("mouseover", dropdown(childMenu.id));
        elems[i].addEventListener("mouseleave", dropup(childMenu.id));
        elems[i].addEventListener("click", dropdown(childMenu.id));
    }
    
    document.body.addEventListener("hover",dropup())
}

function arithmetic ()
{
    const operators = ["+","-","*","/"];
    const precisions = ['i','d','f'];
    const max = 100;
    const min = 1;
    let score = 0;
    let xnumerator;
    let xdenominator;
    let ynumerator;
    let ydenominator;
    let operator;
    let precision;
    let answer;
    function init ()
    {
        render();
    }
    function render()
    {
        let canvas = document.getElementById("problem-canvas");
        while(canvas.firstChild)
        {
            canvas.removeChild(canvas.firstChild);
        }
        let question = document.createElement("section");
        resetProblem();
        question.innerHTML = "operand range:" + max + ":" + min;
        question.innerHTML += "score" + score;
        question.innerHTML += "answer" + answer;
        question.innerHTML += precision == precisions[2] ? xnumerator+'/'+xdenominator+' '+operator+' '+ynumerator+'/'+ydenominator
        :  xnumerator+' '+operator+' '+ynumerator;
        canvas.appendChild(question);
        let input = document.createElement("input");
        input.addEventListener("input",(e)=>{handleInput(e)});
        canvas.appendChild(input);
        input.focus();
    }
    function handleInput (e)
    {
        if (Math.abs(e.target.value-answer)<.0001)
        {
            console.log("true");
            score += 1;
            render();
        }
    }
    function resetProblem () {
        const roll = Math.random() * 100;
        const newOperator = operators[Math.floor(roll/25)];
        // int or float or fractional arithmetic operation
        const format = precisions[Math.floor(roll/33)];
        let nx = Math.random()*(max-min);
        let dx = Math.random()*(max-min);
        let ny = Math.random()*(max-min);
        let dy = Math.random()*(max-min);
        // parse based on operator to avoid too difficult questions
        if (newOperator == "/" && nx < ny)
        {
            const tmp = nx;
            nx = ny;
            ny = tmp;
        }
        else if (newOperator == "*")
        {
            while (nx > 20 && ny > 20)
            {
                ny=ny/10;
            }
        }
        //format values based on precision of question
        if (format == precisions[2])
        {
            nx = Math.floor(nx);
            ny = Math.floor(ny);
            dx = Math.floor(dx);
            dy = Math.floor(dy);
        }
        else if (format == precisions[1])
        {
            nx = nx.toFixed(2);
            ny = ny.toFixed(2);
            dx = 1;
            dy = 1;
        }
        else if (format == precisions[0])
        {
            nx = Math.floor(nx);
            ny = Math.floor(ny);
            dx = 1;
            dy = 1;
        }
        operator = newOperator;
        xnumerator = nx;
        xdenominator = dx;
        ynumerator = ny;
        ydenominator = dy;
        precision = format;
        if (newOperator==operators[0])
        {
            answer = (nx*dy)+(ny*dx);
        }
        else if (newOperator==operators[1])
        {
            answer = (nx*dy)-(ny*dx);
        }
        else if (newOperator==operators[2])
        {
            answer = (nx*dy)*(ny*dx);
        }
        else if(newOperator==operators[3])
        {
            answer = (nx*dy)/(ny*dx);
        }
    }
    return {
        init,
    }
}

function main () {
    let modes = ["arithmetic"];
    let mode = modes[0];
    init();
    if (mode == modes[0])
    {
        arithmetic().init();
    }
}

main ();
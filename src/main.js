function timer ()
{
    let varDomElement;
    let varDoubleInterval;
    let varDateTimeExpected;
    function init (argDomElement, argDoubleTimerLength) {
        varDomElement = argDomElement;
        varDoubleInterval = 1000;
        varDateTimeExpected = Date.now() + argDoubleTimerLength;
        setTimeout(step,varDoubleInterval);
        varDomElement.innerHTML = Date.now();
    }
    function step() {
        var varDoubleDelta = Date.now() - varDateTimeExpected;
        if (varDoubleDelta > varDoubleInterval) {
            //console.log("timer().step() >> doh");
        }
        varDomElement.innerHTML = Date.now();
        varDateTimeExpected += varDoubleInterval;
        setTimeout(step,Math.max(0,varDoubleInterval-varDoubleDelta));
    }
    return {
        init,
        step,
    }
}

function arithmetic ()
{
    const operators = ["+","-","*","/"];
    const precisions = ['i','d','f'];
    const max = 50;
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
        let options = document.getElementById("arithmetic-options");
        let varElemOperandRange = document.createElement("div")
        varElemOperandRange
        varElemOperandRange.id = "option-operand-range";
        let varElemMax = document.createElement("input");
        varElemMax.id = "option-operand-range-max";
        let varElemMin = document.createElement("input");
        varElemMin.id = "option-operand-range-min";
        options.appendChild(varElemOperandRange);
        varElemOperandRange.appendChild(varElemMax);
        varElemOperandRange.appendChild(varElemMin);
        render();
    }

    function render()
    {
        resetProblem();
        updateOperandRange();
        let options = document.getElementById("arithmetic-options");
        let varElemScore = document.createElement("option")
        varElemScore.innerHTML = "score:" + score;
        options.appendChild(varElemScore);
        let canvas = document.getElementById("problem-canvas");
        while(canvas.firstChild)
        {
            canvas.removeChild(canvas.firstChild);
        }
        let question = document.createElement("section");
        question.innerHTML += "answer" + answer;
        question.innerHTML += precision == precisions[2] ? xnumerator+'/'+xdenominator+' '+operator+' '+ynumerator+'/'+ydenominator
        :  xnumerator+' '+operator+' '+ynumerator;
        canvas.appendChild(question);
        let input = document.createElement("input");
        input.addEventListener("input",(e)=>{handleInput(e)});
        canvas.appendChild(input);
        input.focus();
    }
    function updateOperandRange()
    {
        let varElemMax = document.getElementById("option-operand-range-max");
        varElemMax.defaultValue = max;
        let varElemMin = document.getElementById("option-operand-range-min");
        varElemMin.defaultValue = min;
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
    let varDomElementTimer = document.getElementById("problem-timer");
    let modes = ["arithmetic"];
    let mode = modes[0];
    if (mode == modes[0])
    {
        timer().init(varDomElementTimer,1);
        arithmetic().init();
    }
}

main ();
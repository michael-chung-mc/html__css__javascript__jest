function timer ()
{
    let varDomElement;
    let varDoubleInterval;
    let varDateTimeNowExpected;
    let varDateTimeNow;
    let varDateTimeEnd;
    let varTimeout;
    function init (argDomElement, argTimerInterval) {
        varDomElement = argDomElement;
        varDoubleInterval = argTimerInterval;
    }
    function step() {
        varDateTimeNow = Date.now();
        let varDoubleDelta =  varDateTimeNow - varDateTimeNowExpected;
        // if (varDoubleDelta > varDoubleInterval) {
        //     console.log("timer().step() >> skipped a step");
        // }
        if (varDateTimeNow >= varDateTimeEnd)
        {
            stop();
        }
        else
        {
            varDomElement.innerHTML =  varDateTimeNow;
            varDateTimeNowExpected += varDoubleInterval;
            setTimeout(step,Math.max(0,varDoubleInterval-varDoubleDelta));
        }
    }
    function start(argDoubleTimerLength)
    {
        varDateTimeNow = Date.now();
        varDateTimeEnd = varDateTimeNow + argDoubleTimerLength;
        varDateTimeNowExpected = varDateTimeNow + varDoubleInterval;
        varDomElement.innerHTML = varDateTimeNow;
        varTimeout = setTimeout(step,varDoubleInterval);
    }
    function stop()
    {
        clearTimeout(varTimeout);
    }
    return {
        init,
        start,
        stop,
    }
}

function arithmetic ()
{
    let varDomOptions;
    let varDomMax;
    let varDomMin;
    let varDomScore;
    let varDomCanvas;

    const varOperations = ["+","-","*","/"];
    let activatedOperations = varOperations;
    const precisions = ['i','d','f'];
    let chosenPrecision;

    let max = 50;
    let min = 1;
    let score = 0;
    let xnumerator;
    let xdenominator;
    let ynumerator;
    let ydenominator;
    let operator;
    let precision;
    let answer;

    function init (argDomCanvas, argDomOptions, argDomScoreBoard) {
        varDomCanvas = argDomCanvas;
        varDomOptions = argDomOptions;
        varDomScore = argDomScoreBoard;

        let varElemOperandRange = document.createElement("div")
        varElemOperandRange.id = "option-operand-range";
        varDomMax = document.createElement("input");
        varDomMax.id = "option-operand-range-max";
        varDomMin = document.createElement("input");
        varDomMin.id = "option-operand-range-min";
        varElemOperandRange.appendChild(varDomMax);
        varElemOperandRange.appendChild(varDomMin);
        varDomOptions.appendChild(varElemOperandRange);

        render();
    }
    function enableOperation(index) { activatedOperations = varOperations[index] in activatedOperations ? activatedOperations : [...activatedOperations,varOperations[index]]; }
    function enableAddition() { enableOperation(0); }
    function enableSubtraction() { enableOperation(1); }
    function enableMultiplication() { enableOperation(2); }
    function enableDivision() { enableOperation(3); }
    function disableOperation(index) {activatedOperations = activatedOperations.filter((i)=>i!==varOperations[index]);}
    function disableAddition() { disableOperation(0); }
    function disableSubtraction() { disableOperation(1); }
    function disableMultiplication() { disableOperation(2); }
    function disableDivision() { disableOperation(3); }
    function updateOperandRange()  {
        varDomMax.defaultValue = max;
        varDomMin.defaultValue = min;
    }
    function updateScore() {
        varDomScore.innerHTML = "score:" + score;
    }


    function render()
    {
        resetProblem();
        updateOperandRange();
        updateScore();
        while(varDomCanvas.firstChild)
        {
            varDomCanvas.removeChild(varDomCanvas.firstChild);
        }
        let question = document.createElement("section");
        //question.innerHTML += "answer" + answer;
        question.innerHTML += precision == precisions[2] ? xnumerator+'/'+xdenominator+' '+operator+' '+ynumerator+'/'+ydenominator
        :  xnumerator+' '+operator+' '+ynumerator;
        varDomCanvas.appendChild(question);
        let input = document.createElement("input");
        input.addEventListener("input",(e)=>{handleInput(e)});
        varDomCanvas.appendChild(input);
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
        const newOperator = activatedOperations[Math.floor(roll/25)];
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
        if (newOperator==activatedOperations[0])
        {
            answer = (nx*dy)+(ny*dx);
        }
        else if (newOperator==activatedOperations[1])
        {
            answer = (nx*dy)-(ny*dx);
        }
        else if (newOperator==activatedOperations[2])
        {
            answer = (nx*dy)*(ny*dx);
        }
        else if(newOperator==activatedOperations[3])
        {
            answer = (nx*dy)/(ny*dx);
        }
    }
    return {
        init,
    }
}

function main () {
    let varDomCanvas = document.getElementById("problem-canvas");
    let varDomScore = document.getElementById("problem-score");
    let varDomOptions = document.getElementById("arithmetic-options");
    let varTimer = timer();
    let varDomElementTimer = document.getElementById("problem-timer");
    let modes = ["arithmetic"];
    let mode = modes[0];
    if (mode == modes[0])
    {
        varTimer.init(varDomElementTimer,1000);
        arithmetic().init(varDomCanvas,varDomOptions,varDomScore);
    }
}

main();
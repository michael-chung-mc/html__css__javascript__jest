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
    let varDomEnabledOperations;
    let varDomDisabledOperations;
    let varDomEnabledPrecisions;
    let varDomDisabledPrecisions;


    const varOperations = ["+","-","*","/"];
    let varEnabledOperations = varOperations;
    const varPrecisions = ['i','d','f'];
    let varEnabledPrecisions = varPrecisions;

    let max = 50;
    let min = 1;
    let score = 0;
    let xnumerator;
    let xdenominator;
    let ynumerator;
    let ydenominator;
    let varOperator;
    let varPrecision;
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

        varDomEnabledOperations = document.createElement("div")
        varDomEnabledOperations.id = "option-activated-operations";
        varDomOptions.appendChild(varDomEnabledOperations);
        varDomDisabledOperations = document.createElement("div")
        varDomDisabledOperations.id = "option-disabled-operations";
        varDomOptions.appendChild(varDomDisabledOperations);

        varDomEnabledPrecisions = document.createElement("div")
        varDomEnabledPrecisions.id = "option-activated-precisions";
        varDomOptions.appendChild(varDomEnabledPrecisions);
        varDomDisabledPrecisions = document.createElement("div")
        varDomDisabledPrecisions.id = "option-disabled-precisions";
        varDomOptions.appendChild(varDomDisabledPrecisions);

        render();
    }
    function enableOperation(index) { varEnabledOperations = varOperations[index] in varEnabledOperations ? varEnabledOperations : [...varEnabledOperations,varOperations[index]]; }
    function enableAddition() { enableOperation(0); }
    function enableSubtraction() { enableOperation(1); }
    function enableMultiplication() { enableOperation(2); }
    function enableDivision() { enableOperation(3); }
    function disableOperation(index) { varEnabledOperations = varEnabledOperations.length > 1 ? varEnabledOperations.filter((i)=>i!==varOperations[index]) : varEnabledOperations ;}
    function disableAddition() { disableOperation(0); }
    function disableSubtraction() { disableOperation(1); }
    function disableMultiplication() { disableOperation(2); }
    function disableDivision() { disableOperation(3); }
    function updateOperations() {
        while(varDomEnabledOperations.firstChild)
        {
            varDomEnabledOperations.removeChild(varDomEnabledOperations.firstChild);
        }
        while(varDomDisabledOperations.firstChild)
        {
            varDomDisabledOperations.removeChild(varDomDisabledOperations.firstChild);
        }
        varOperations.forEach((op) =>
        {
            let varDomOp = document.createElement("button");
            varDomOp.id = op.toString();
            varDomOp.innerHTML = op.toString();
            if (!varEnabledOperations.includes(op))
            {
                varDomOp.addEventListener("click",()=>
                {
                    enableOperation(varOperations.indexOf(op))
                    render();
                });
                varDomDisabledOperations.appendChild(varDomOp);
            }
            else
            {
                varDomOp.addEventListener("click",()=>
                {
                    disableOperation(varOperations.indexOf(op))
                    render();
                });
                varDomEnabledOperations.appendChild(varDomOp);
            }
        })
    }
    function updateOperator ()
    {
        const varMaxRoll = 100;
        const roll = Math.random() * varMaxRoll;
        let index = Math.floor(roll/(varMaxRoll/varEnabledOperations.length));
        varOperator = varEnabledOperations[index];
    }
    function updateOperandRange()  {
        varDomMax.defaultValue = max;
        varDomMin.defaultValue = min;
    }
    function enablePrecision(index) { varEnabledPrecisions = varPrecisions[index] in varEnabledPrecisions ? varEnabledPrecisions : [...varEnabledPrecisions,varPrecisions[index]]; }
    function disablePrecision(index) { varEnabledPrecisions = varEnabledPrecisions.length > 1 ? varEnabledPrecisions.filter((i)=>i!==varPrecisions[index]) : varEnabledPrecisions ;}
    function updatePrecisions()
    {
        while(varDomEnabledPrecisions.firstChild)
        {
            varDomEnabledPrecisions.removeChild(varDomEnabledPrecisions.firstChild);
        }
        while(varDomDisabledPrecisions.firstChild)
        {
            varDomDisabledPrecisions.removeChild(varDomDisabledPrecisions.firstChild);
        }
        varPrecisions.forEach((op) =>
        {
            let varDomPrecision = document.createElement("button");
            varDomPrecision.id = op.toString();
            varDomPrecision.innerHTML = op.toString();
            if (!varEnabledPrecisions.includes(op))
            {
                varDomPrecision.addEventListener("click",()=>
                {
                    enablePrecision(varPrecisions.indexOf(op))
                    render();
                });
                varDomDisabledPrecisions.appendChild(varDomPrecision);
            }
            else
            {
                varDomPrecision.addEventListener("click",()=>
                {
                    disablePrecision(varPrecisions.indexOf(op))
                    render();
                });
                varDomEnabledPrecisions.appendChild(varDomPrecision);
            }
        })
    }
    function updatePrecision ()
    {
        const varMaxRoll = 100;
        const roll = Math.random() * varMaxRoll;
        let index = Math.floor(roll/(varMaxRoll/varEnabledPrecisions.length));
        varPrecision = varEnabledPrecisions[index];
    }
    function updateScore() {
        varDomScore.innerHTML = "score:" + score;
    }
    function checkAnswer (e)
    {
        if (Math.abs(e.target.value-answer)<.0001)
        {
            console.log("true");
            score += 1;
            render();
        }
    }
    function render()
    {
        resetProblem();
        updateOperandRange();
        updateOperations();
        updatePrecisions();
        updateScore();
        while(varDomCanvas.firstChild)
        {
            varDomCanvas.removeChild(varDomCanvas.firstChild);
        }
        let question = document.createElement("section");
        //question.innerHTML += "answer" + answer;
        question.innerHTML += varPrecision == varPrecisions[2] ? xnumerator+'/'+xdenominator+' '+varOperator+' '+ynumerator+'/'+ydenominator
        :  xnumerator+' '+varOperator+' '+ynumerator;
        varDomCanvas.appendChild(question);
        let input = document.createElement("input");
        input.addEventListener("input",(e)=>{checkAnswer(e)});
        varDomCanvas.appendChild(input);
        input.focus();
    }
    function resetProblem () {
        const roll = Math.random() * 100;
        updateOperator();
        // int or float or fractional arithmetic operation
        let nx = Math.random()*(max-min);
        let dx = Math.random()*(max-min);
        let ny = Math.random()*(max-min);
        let dy = Math.random()*(max-min);
        // parse based on operator to avoid too difficult questions
        if (varOperator == "/" && nx < ny)
        {
            const tmp = nx;
            nx = ny;
            ny = tmp;
        }
        else if (varOperator == "*")
        {
            while (nx > 20 && ny > 20)
            {
                ny=ny/10;
            }
        }
        //format values based on precision of question
        if (varPrecision == varEnabledPrecisions[2])
        {
            nx = Math.floor(nx);
            ny = Math.floor(ny);
            dx = Math.floor(dx);
            dy = Math.floor(dy);
        }
        else if (varPrecision == varEnabledPrecisions[1])
        {
            nx = nx.toFixed(2);
            ny = ny.toFixed(2);
            dx = 1;
            dy = 1;
        }
        else if (varPrecision == varEnabledPrecisions[0])
        {
            nx = Math.floor(nx);
            ny = Math.floor(ny);
            dx = 1;
            dy = 1;
        }
        varOperator = varOperator;
        xnumerator = nx;
        xdenominator = dx;
        ynumerator = ny;
        ydenominator = dy;
        if (varOperator==varEnabledOperations[0])
        {
            answer = (nx*dy)+(ny*dx);
        }
        else if (varOperator==varEnabledOperations[1])
        {
            answer = (nx*dy)-(ny*dx);
        }
        else if (varOperator==varEnabledOperations[2])
        {
            answer = (nx*dy)*(ny*dx);
        }
        else if(varOperator==varEnabledOperations[3])
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
function ticker ()
{
    let varDom;
    let varDoubleLimit;
    let varDoubleInterval;
    let varDateTimeNowExpected;
    let varDateTimeNow;
    let varDateTimeEnd;
    let varTimeout;
    let varTick = 0;

    function init (argTimerInterval, argDom) {
        varDoubleInterval = argTimerInterval;
        varDom = argDom;
        varTick = 0;
        if (varDom) varDom.innerHTML = 0;
    }
    function tick() {
        //console.log(`tick ${varTick}`);
        varDateTimeNow = Date.now();
        let varDoubleDelta =  varDateTimeNow - varDateTimeNowExpected;
        // if (varDoubleDelta > varDoubleInterval) {
        //     console.log("timer().step() >> skipped a step");
        // }
        if (varDateTimeNow >= varDateTimeEnd || varTick >= varDoubleLimit)
        {
            stop();
        }
        else
        {
            varTick +=1;
            if (varDom) varDom.innerHTML = varDoubleLimit - varTick;
            varDateTimeNowExpected += varDoubleInterval;
            if (varTimeout) { clearTimeout(varTimeout); }
            varTimeout = setTimeout(tick,Math.max(0,varDoubleInterval-varDoubleDelta));
        }
    }
    function start(argDoubleSeconds)
    {
        //console.log(`start ${varTick}`);
        varDoubleLimit = argDoubleSeconds;
        varDateTimeNow = Date.now();
        varDateTimeEnd = varDateTimeNow + argDoubleSeconds*1000;
        varDateTimeNowExpected = varDateTimeNow + varDoubleInterval;
        if (varTimeout) { clearTimeout(varTimeout); }
        varTimeout = setTimeout(tick,varDoubleInterval);
        varTick = 0;
        if (varDom) varDom.innerHTML = varDoubleLimit - varTick;
    }
    function stop()
    {
        //console.log(`stop ${varTick}`);
        if (varTimeout) { clearTimeout(varTimeout); }
        varTick = 0;
        if (varDom) varDom.innerHTML = varTick;
    }
    function getTick()
    {
        return varTick;
    }
    return {
        varTick,
        init,
        start,
        stop,
        getTick,
    }
}

function arithmetic ()
{
    let varDomOptions;
    let varDomOperandRange;
    let varDomMax;
    let varDomMin;
    let varDomScore;
    let varDomCanvas;
    let varDomEnabledOperations;
    let varDomDisabledOperations;
    let varDomEnabledPrecisions;
    let varDomDisabledPrecisions;

    let varDomTimerLimit;
    let varTimer;
    let varTimerIncrement = 1000;
    let varTimerLimit = 60;

    const varOperations = ["+","-","*","/"];
    let varEnabledOperations = varOperations;
    const varPrecisions = ['integer','decimal','fraction'];
    let varEnabledPrecisions = varPrecisions;

    let varMax = 100;
    let varMin = 2;
    let score = 0;
    let xnumerator;
    let xdenominator;
    let ynumerator;
    let ydenominator;
    let varOperator;
    let varPrecision;
    let answer;

    function init (argDomCanvas, argDomOptions, argDomScoreBoard, argDomTimer) {
        varDomCanvas = argDomCanvas;
        varDomOptions = argDomOptions;
        varDomScore = argDomScoreBoard;

        let varDomText = document.createElement("div");
        varDomOperandRange = document.createElement("div")
        varDomOperandRange.className="option";
        varDomOperandRange.id = "option-operand-range";
        varDomText = document.createElement("div");
        varDomText.innerHTML = "Max:";
        varDomOperandRange.appendChild(varDomText);
        varDomMax = document.createElement("input");
        varDomMax.id = "option-operand-range-max";
        varDomMax.addEventListener("input", (e)=>{updateMax(e.target.value)});
        varDomOperandRange.appendChild(varDomMax);
        varDomMin = document.createElement("input");
        varDomMin.id = "option-operand-range-min";
        varDomMin.addEventListener("input", (e)=>{updateMin(e.target.value)});
        varDomText = document.createElement("div");
        varDomText.innerHTML = "Min:";
        varDomOperandRange.appendChild(varDomText);
        varDomOperandRange.appendChild(varDomMin);
        varDomOptions.appendChild(varDomOperandRange);

        let varDomOption = document.createElement("div")
        varDomOption.className="option";
        varDomText = document.createElement("div");
        varDomText.innerHTML = "Enabled:";
        varDomOption.appendChild(varDomText);
        varDomEnabledOperations = document.createElement("div")
        varDomEnabledOperations.id = "option-activated-operations";
        varDomOption.appendChild(varDomEnabledOperations);
        varDomText = document.createElement("div");
        varDomText.innerHTML = "Disabled:";
        varDomOption.appendChild(varDomText);
        varDomDisabledOperations = document.createElement("div")
        varDomDisabledOperations.id = "option-disabled-operations";
        varDomOption.appendChild(varDomDisabledOperations);
        varDomOptions.appendChild(varDomOption);

        varDomOption = document.createElement("div")
        varDomOption.className="option";
        varDomText = document.createElement("div");
        varDomText.innerHTML = "Enabled:";
        varDomOption.appendChild(varDomText);
        varDomEnabledPrecisions = document.createElement("div")
        varDomEnabledPrecisions.id = "option-activated-precisions";
        varDomOption.appendChild(varDomEnabledPrecisions);
        varDomText = document.createElement("div");
        varDomText.innerHTML = "Disabled:";
        varDomOption.appendChild(varDomText);
        varDomDisabledPrecisions = document.createElement("div")
        varDomDisabledPrecisions.id = "option-disabled-precisions";
        varDomOption.appendChild(varDomDisabledPrecisions);
        varDomOptions.appendChild(varDomOption);

        
        varDomOption = document.createElement("div")
        varDomOption.className="option";
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
                varDomOp.addEventListener("click", function()
                {
                    enableOperation(varOperations.indexOf(op))
                    resetScore();
                    varTimer.stop();
                    render();
                });
                varDomDisabledOperations.appendChild(varDomOp);
            }
            else
            {
                varDomOp.addEventListener("click",()=>
                {
                    disableOperation(varOperations.indexOf(op))
                    resetScore();
                    varTimer.stop();
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
        varDomMax.defaultValue = varMax;
        varDomMin.defaultValue = varMin;
    }
    function updateMax(value)
    {
        varMax = value > varMin ? value : varMax;
        render();
    }
    function updateMin(value)
    {
        varMin = value < varMax ? value : varMin;
        render();
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
                varDomPrecision.addEventListener("click", function()
                {
                    enablePrecision(varPrecisions.indexOf(op))
                    resetScore();
                    varTimer.stop();
                    render();
                });
                varDomDisabledPrecisions.appendChild(varDomPrecision);
            }
            else
            {
                varDomPrecision.addEventListener("click", function()
                {
                    disablePrecision(varPrecisions.indexOf(op))
                    resetScore();
                    varTimer.stop();
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
    function resetScore() {
        score = 0;
    }
    function updateScore() {
        varDomScore.innerHTML = "score:" + score;
    }
    function updateTimerLimit(value)
    {
        varTimerLimit = value > 0 ? value : varTimerLimit;
        render();
    }
    function checkAnswer (e)
    {
        if (Math.abs(e.target.value-answer)<.0001)
        {
            if (varTimer.getTick() === 0)
            {
                varTimer.start(varTimerLimit);
            }
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
        //question.innerHTML += "answer" + answer + "----";
        question.innerHTML += varPrecision == varPrecisions[2] ? xnumerator+'/'+xdenominator+' '+varOperator+' '+ynumerator+'/'+ydenominator
        :  xnumerator+' '+varOperator+' '+ynumerator;
        varDomCanvas.appendChild(question);
        let input = document.createElement("input");
        input.id = "input-answer";
        input.addEventListener("input",(e)=>{checkAnswer(e)});
        varDomCanvas.appendChild(input);
        if ((varTimer.getTick()==0 && score == 1) || varTimer.getTick()!==0) input.focus();
    }
    function resetProblem () {
        // console.log(max);
        // console.log(min);
        xnumerator = Math.random()*(varMax-varMin+1) + varMin;
        xdenominator = Math.random()*(varMax-varMin+1) + varMin;
        ynumerator = Math.random()*(varMax-varMin+1) + varMin;
        ydenominator = Math.random()*(varMax-varMin+1) + varMin;
        updateOperator();
        updatePrecision();
        //format values based on operation
        if (varOperator == varOperations[3])
        {
            if (xnumerator < ynumerator)
            {
                const tmp = xnumerator;
                xnumerator = ynumerator;
                ynumerator = tmp;
            }
        }
        //format values based on precision
        if (varPrecision == varPrecisions[2])
        {
            xnumerator = Math.floor(xnumerator);
            ynumerator = Math.floor(ynumerator);
            xdenominator = Math.floor(xdenominator);
            ydenominator = Math.floor(ydenominator);
        }
        else if (varPrecision == varPrecisions[1])
        {
            xnumerator = xnumerator.toFixed(2);
            ynumerator = ynumerator.toFixed(2);
            xdenominator = 1;
            ydenominator = 1;
        }
        else if (varPrecision == varPrecisions[0])
        {
            xnumerator = Math.floor(xnumerator);
            ynumerator = Math.floor(ynumerator);
            xdenominator = 1;
            ydenominator = 1;
            for (let i = 1; xnumerator % ynumerator != 0 && xnumerator < varMax; i++)
            {
                xnumerator = ynumerator * i + 1;
            }
        }
        while (xnumerator > varMax && ynumerator > varMax)
        {
            ynumerator=ynumerator/10;
        }
        if (varOperator==varOperations[0])
        {
            answer = (xnumerator*ydenominator)+(ynumerator*xdenominator);
        }
        else if (varOperator==varOperations[1])
        {
            answer = (xnumerator*ydenominator)-(ynumerator*xdenominator);
        }
        else if (varOperator==varOperations[2])
        {
            answer = (xnumerator*ydenominator)*(ynumerator*xdenominator);
        }
        else if(varOperator==varOperations[3])
        {
            answer = (xnumerator*ydenominator)/(ynumerator*xdenominator);
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
    let varDomTimer = document.getElementById("problem-timer");
    let modes = ["arithmetic"];
    let mode = modes[0];
    if (mode == modes[0])
    {
        arithmetic().init(varDomCanvas,varDomOptions,varDomScore,varDomTimer);
    }
}

main();
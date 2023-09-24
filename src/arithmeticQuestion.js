function arithmetic ()
{
    let varDomOptions;
    let varDomOperandRange;
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

    const varRange = [{max:100,min:2},{max:100,min:2}];
    let score = 0;
    let varDecimalPrecision = 2;
    let numerators;
    let denominators;
    let varOperator;
    let varPrecision;
    let answer;

    function init (argDomCanvas, argDomOptions, argDomScoreBoard, argDomTimer) {
        varDomCanvas = argDomCanvas;
        varDomOptions = argDomOptions;
        varDomScore = argDomScoreBoard;

        let varDomText = document.createElement("div");
        varDomOperandRange = document.createElement("div")
        varDomOperandRange.classList.add("option");
        varDomOperandRange.id = "option-operand-range";
        varDomOptions.appendChild(varDomOperandRange);

        let varDomOption = document.createElement("div")
        varDomOption.classList.add("option");
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
        varDomOption.classList.add("option");
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

        render();
    }
    function enableOperation(index) { varEnabledOperations = varOperations[index] in varEnabledOperations ? varEnabledOperations : [...varEnabledOperations,varOperations[index]]; }
    function disableOperation(index) { varEnabledOperations = varEnabledOperations.length > 1 ? varEnabledOperations.filter((i)=>i!==varOperations[index]) : varEnabledOperations ;}
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
        while(varDomOperandRange.firstChild)
        {
            varDomOperandRange.removeChild(varDomOperandRange.firstChild);
        }
        for (let i = 0; i < varRange.length; i++)
        {
            let varDomText = document.createElement("div");
            varDomText.innerHTML = "Max "+ (i + 1) + ":";
            varDomOperandRange.appendChild(varDomText);
            let varDomMax = document.createElement("input");
            varDomMax.className = "range-input";
            varDomMax.id = "option-operand-range-max-" + i;
            varDomMax.addEventListener("input", (e)=>{updateMax(i, e.target.value)});
            varDomMax.defaultValue = varRange[i].max;
            varDomMax.style.width = varDomMax.defaultValue.length + 'ch';
            varDomOperandRange.appendChild(varDomMax);
            varDomText = document.createElement("div");
            varDomText.innerHTML = "Min "+ (i + 1) + ":";
            varDomOperandRange.appendChild(varDomText);
            let varDomMin = document.createElement("input");
            varDomMin.className = "range-input";
            varDomMin.id = "option-operand-range-min-" + i;
            varDomMin.addEventListener("input", (e)=>{updateMin(i, e.target.value)});
            varDomMin.defaultValue = varRange[i].min;
            varDomMin.style.width = varDomMin.defaultValue.length + 'ch';
            varDomOperandRange.appendChild(varDomMin);
        }
    }
    function updateMax(index, value)
    {
        varRange[index].max = value > varRange[index].min ? value : varRange[index].max;
        resetScore();
        varTimer.stop();
        render();
    }
    function updateMin(index, value)
    {
        varRange[index].min = value < varRange[index].max ? value : varRange[index].min;
        resetScore();
        varTimer.stop();
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
        let guess = e.target.value;
        //console.log(guess);
        if (guess.match(/\d*\.?\d*\/\d*\.?\d*/))
        {
            let split = guess.split("\/");
            guess = parseFloat(split[0])/parseFloat(split[1]);
        }
        //console.log(guess);
        if (Math.abs(guess-answer)<.0001)
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
        let varQuestionString = ""
        //varQuestionString += "answer:" + answer + "----";
        console.log(answer);
        for (let i = 0; i < varRange.length; i++)
        {
            varQuestionString += varPrecision == varPrecisions[2] ? numerators[i]+'/'+denominators[i]: numerators[i];
            varQuestionString += i == varRange.length-1 ? '' : ' '+varOperator+' ';
        }
        question.innerHTML += varQuestionString;
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
        numerators = [];
        for (let i = 0; i < varRange.length; i++)
        {
            numerators.push(Math.random()*(varRange[i].max-varRange[i].min+1) + varRange[i].min);
        }
        denominators = [];
        for (let i = 0; i < varRange.length; i++)
        {
            denominators.push(Math.random()*(varRange[i].max-varRange[i].min+1) + varRange[i].min);
        }
        updateOperator();
        updatePrecision();
        //enforce precision
        if (varPrecision == varPrecisions[2])
        {
            for (let i = 0; i < numerators.length; i++)
            {
                numerators[i] = Math.floor(numerators[i]);
            }
            for (let i = 0; i < denominators.length; i++)
            {
                denominators[i] = Math.floor(denominators[i]);
            }
        }
        else if (varPrecision == varPrecisions[1])
        {
            // allow integers
            for (let i = 0; i < numerators.length; i++)
            {
                let flip = Math.random();
                numerators[i] = flip > .5 ? numerators[i].toFixed(varDecimalPrecision) : Math.floor(numerators[i]);
            }
            for (let i = 0; i < denominators.length; i++)
            {
                denominators[i] = 1;
            }
        }
        else if (varPrecision == varPrecisions[0])
        {
            for (let i = 0; i < numerators.length; i++)
            {
                numerators[i] = Math.floor(numerators[i]);
            }
            for (let i = 0; i < denominators.length; i++)
            {
                denominators[i] = 1;
            }
        }
        for (let i = 0; i < numerators.length; i++)
        {
            while (numerators[i] > varRange[i].max)
            {
                numerators[i]=numerators[i]/varRange[i].min;
            }
            if (numerators[i] < varRange[i].min) {numerators[i] = varRange[i].min;}
        }
        //format values based on operation
        if (varOperator == varOperations[3])
        {
            //console.log(`division`);
            // ban decimal/decimal
            for (let i = 0; i < numerators.length; i++)
            {
                numerators[i] = Math.floor(numerators[i]);
            }
            for (let i = 0; i < denominators.length; i++)
            {
                denominators[i] = Math.floor(denominators[i]);
            }
            //console.log(`division banned decimal/decimal`);
            // easy division to get integers
            let factor = findFactor(numerators);
            factor = factor == 0 && numerators[0] < numerators[1] ? numerators[0] : numerators[1];
            for (let i = 0; i < numerators.length; i++)
            {
                numerators[i] = numerators[i] - numerators[i] % factor;
            }
            // sort for easier operations
            if (numerators[0] < numerators[1])
            {
                const tmp = numerators[0];
                numerators[0] = numerators[1];
                numerators[1] = tmp;
            }
        }
        if (varOperator==varOperations[0])
        {
            answer = 0;
            for (let i = 0; i < varRange.length-1; i+=2)
            {
                answer += (numerators[i]*denominators[i+1])+(numerators[i+1]*denominators[i]);
            }
        }
        else if (varOperator==varOperations[1])
        {
            answer = 0;
            for (let i = 0; i < varRange.length-1; i+=2)
            {
                answer += (numerators[i]*denominators[i+1])-(numerators[i+1]*denominators[i]);
            }
        }
        else if (varOperator==varOperations[2])
        {
            answer = 0;
            for (let i = 0; i < varRange.length-1; i+=2)
            {
                answer += (numerators[i]*denominators[i+1])*(numerators[i+1]*denominators[i]);
            }
        }
        else if(varOperator==varOperations[3])
        {
            answer = 0;
            for (let i = 0; i < varRange.length-1; i+=2)
            {
                answer += (numerators[i]*denominators[i+1])/(numerators[i+1]*denominators[i]);
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

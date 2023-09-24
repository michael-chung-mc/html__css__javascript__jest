function colorPickQuestion () {
    let varDomCanvas;
    let varDomOptions;
    let varDomScore;
    let varDomTimerLimit;

    let varTimer;
    let varTimerIncrement = 1000;
    let varTimerLimit = 60;

    let varColor = {red:0,green:0,blue:0};

    let varScore;

    function init (argDomCanvas, argDomOptions, argDomScoreBoard, argDomTimer) {
        varDomCanvas = argDomCanvas;
        varDomOptions = argDomOptions;
        varDomScore = argDomScoreBoard;

        varDomColorRange = document.createElement("div");
        varDomColorRange.id = "option-color-range";
        varDomOptions.appendChild(varDomColorRange);

        let varDomOption = document.createElement("div")
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
    function updateTimerLimit(value)
    {
        varTimerLimit = value > 0 ? value : varTimerLimit;
        render();
    }
    function render ()
    {
        updateScore();
        while(varDomCanvas.firstChild)
        {
            varDomCanvas.removeChild(varDomCanvas.firstChild);
        }
        let varDomQuestion = document.createElement("div");
        varDomQuestion.classList.add("swatch");
        varDomQuestion.style.backgroundColor = `rgb(${varColor.red},${varColor.green},${varColor.blue}`;
        varDomCanvas.appendChild(varDomQuestion);
        let varDomInput = document.createElement("input");
        varDomInput.id = "input-answer";
        varDomInput.addEventListener("input",(e)=>{checkAnswer(e.target.value)});
        varDomCanvas.appendChild(varDomInput);
        if ((varTimer.getTick()==0 && varScore == 1) || varTimer.getTick()!==0) input.focus();
    }
    function checkAnswer(value)
    {
        if (value.match(/\d*,\d*,\d*/))
        {
            let split = value.split(",");
            console.log(`${varColor.r},${varColor.g},${varColor.b} to ${value}`);
            if (parseInt(varColor.red)===parseInt(split[0])
             && parseInt(varColor.green)===parseInt(split[1])
             && parseInt(varColor.blue)===parseInt(split[2]))
            {
                if (varTimer.getTick() === 0)
                {
                    varTimer.start(varTimerLimit);
                }
                varScore+=1;
                resetColor();
                render();
                console.log(varColor);
            }
        }
    }
    function resetColor()
    {
        let rgb = color();
        varColor = rgb.getRGB();
    }
    function resetScore() {
        varScore = 0;
    }
    function updateScore() {
        varDomScore.innerHTML = "score:" + varScore;
    }
    function updateTimerLimit(value)
    {
        varTimerLimit = value > 0 ? value : varTimerLimit;
        render();
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
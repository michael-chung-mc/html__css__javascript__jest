function main () {
    let modes = ["arithmetic", "color-pick", "color-grid"];
    let mode = modes[0];

    let varDomCanvas = document.getElementById("problem-canvas");
    let varDomSession = document.getElementById("problem-session");
    let varDomScore = document.getElementById("problem-score");
    let varDomOptions = document.getElementById("problem-options");
    let varDomTimer = document.getElementById("problem-timer");
    let varDomProblemArithmetic = document.getElementById("arithmetic-tab");
    varDomProblemArithmetic.addEventListener("click", () => {mode = modes[0]; render();} );
    let varDomProblemColorPick = document.getElementById("color-pick-tab");
    varDomProblemColorPick.addEventListener("click", () => {mode = modes[1]; render();} );
    let varDomProblemColorGrid = document.getElementById("color-grid-tab");
    varDomProblemColorGrid.addEventListener("click", () => {mode = modes[2]; render();} );

    let activeQuestion;

    function render ()
    {
        if (activeQuestion) activeQuestion.stop();
        while (varDomCanvas.firstChild) { varDomCanvas.removeChild(varDomCanvas.firstChild); }
        while (varDomScore.firstChild) { varDomScore.removeChild(varDomScore.firstChild); }
        while (varDomOptions.firstChild) { varDomOptions.removeChild(varDomOptions.firstChild); }
        while (varDomTimer.firstChild) { varDomTimer.removeChild(varDomTimer.firstChild); }
        if (mode == modes[0])
        {
            activeQuestion = arithmeticQuestion();
            activeQuestion.init(varDomCanvas,varDomOptions,varDomScore,varDomTimer);
        }
        else if (mode == modes[1])
        {
            activeQuestion = colorPickQuestion();
            activeQuestion.init(varDomCanvas,varDomOptions,varDomSession,varDomScore,varDomTimer);
        }
        else if (mode == modes[2])
        {
            activeQuestion = colorGradientQuestion();
            activeQuestion.init(varDomCanvas,varDomOptions,varDomScore,varDomTimer);
        }
    }
}

main();
function main () {
    let modes = ["arithmetic"];
    let mode = modes[0];

    let varDomCanvas = document.getElementById("problem-canvas");
    let varDomScore = document.getElementById("problem-score");
    let varDomOptions = document.getElementById("arithmetic-options");
    let varDomTimer = document.getElementById("problem-timer");
    let varDomProblemArithmetic = document.getElementById("arithmetic-tab");
    varDomProblemArithmetic.addEventListener("click", () => {mode = modes[0]; render();} );
    let varDomProblemColor = document.getElementById("color-tab");
    varDomProblemColor.addEventListener("click", () => {mode = modes[1]; render();} );
    function render ()
    {
        while (varDomCanvas.firstChild) { varDomCanvas.removeChild(varDomCanvas.firstChild); }
        while (varDomScore.firstChild) { varDomScore.removeChild(varDomScore.firstChild); }
        while (varDomOptions.firstChild) { varDomOptions.removeChild(varDomOptions.firstChild); }
        while (varDomTimer.firstChild) { varDomTimer.removeChild(varDomTimer.firstChild); }
        if (mode == modes[0])
        {
            arithmetic().init(varDomCanvas,varDomOptions,varDomScore,varDomTimer);
        }
        else if (mode == modes[1])
        {
            console.log("color");
        }
    }
}

main();
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
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

function arithmeticProblem () {
    let x = 1;
    let y = 1;
    let op = "+";
    return {x:x, y:y, op: op};
}

function arithmetic ()
{
    let canvas = document.getElementById("problem-canvas");
    let input = document.createElement("input");
    let question = document.createElement("section");
    let problem = arithmeticProblem();
    question.innerHTML = problem.x + problem.op + problem.y;
    canvas.appendChild(question);
    canvas.appendChild(input);
}

function main () {
    let modes = ["arithmetic"];
    let mode = modes[0];
    init();
    if (mode == modes[0])
    {
        arithmetic();
    }
}

main ();
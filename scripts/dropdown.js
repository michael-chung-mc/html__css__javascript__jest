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

let elems = document.getElementsByClassName("content");
for (let i = 0; i < elems.length; i++)
{
    let childMenu = elems[i].getElementsByClassName("db-content")[0];
    elems[i].addEventListener("mouseover", dropdown(childMenu.id));
    elems[i].addEventListener("mouseleave", dropup(childMenu.id));
    elems[i].addEventListener("click", dropdown(childMenu.id));
}

document.body.addEventListener("hover",dropup())
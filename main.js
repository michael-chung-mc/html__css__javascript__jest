function shiftLeft () {
    return () => {
        console.log("left");
    }
}
function shiftRight () {
    return () => {
        console.log("right");
    }
}
function main () {
    let left = document.getElementById('leftArrow');
    left.addEventListener('click', shiftLeft());
    let right = document.getElementById('rightArrow');
    right.addEventListener('click', shiftRight());
    let frame = document.getElementById('imageContainer');
}
main();
function carousal (start) {
    this.focus = start;
    this.limitStart = 1;
    this.limitEnd = 3;
    this.right = function () {
        this.focus = this.focus + 1 > this.limitEnd ? this.limitStart : this.focus + 1;
    }
    this.left = function () {
        this.focus = this.focus - 1 < this.limitStart ? this.limitEnd : this.focus - 1;
    }
    this.getFocus = function () { return this.focus; };
}
function main () {
    let imgCar = new carousal(1);
    function shiftLeft () {
        return () => {
            console.log(imgCar.focus);
            imgCar.left();
            display();
        }
    }
    function shiftRight () {
        return () => {
            console.log(imgCar.focus);
            imgCar.right();
            display();
        }
    }
    function displayClear () {
        let frame = document.getElementById('imageContainer');
        while (frame.firstChild) {
            frame.removeChild(frame.firstChild);
        }
    }
    function display () {
        displayClear();
        let frame = document.getElementById('imageContainer');
        let img = document.createElement('img');
        if (imgCar.getFocus() == 1)
        {
            img.src = "./home-isometric-1.jpg";
        }
        else if (imgCar.getFocus() == 2)
        {
            img.src = "./home-isometric-2.jpg";
        }
        else if (imgCar.getFocus() == 3)
        {
            img.src = "./home-isometric-3.jpg";
        }
        frame.appendChild(img);
    }
    let left = document.getElementById('leftArrow');
    left.addEventListener('click', shiftLeft());
    let right = document.getElementById('rightArrow');
    right.addEventListener('click', shiftRight());
    display();
}
main();
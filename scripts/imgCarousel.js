function carousal (start) {
    this.focus = start;
    this.limitStart = 1;
    this.limitEnd = 3;
    this.setFocus = function (i)
    {
        if (i >= this.limitStart && i <= this.limitEnd)
        {
            this.focus = i;
        }
    }
    this.right = function () {
        this.focus = this.focus + 1 > this.limitEnd ? this.limitStart : this.focus + 1;
    }
    this.left = function () {
        this.focus = this.focus - 1 < this.limitStart ? this.limitEnd : this.focus - 1;
    }
    this.getFocus = function () { return this.focus; };
    this.getSize = function () { return this.limitEnd-this.limitStart + 1; };
}
function main () {
    let imgCar = new carousal(1);
    function shiftFocus(target) {
        return () => {
            imgCar.setFocus(target);
            display();
        }
    }
    function shiftLeft () {
        return () => {
            //console.log(imgCar.focus);
            imgCar.left();
            display();
        }
    }
    function shiftRight () {
        return () => {
            //console.log(imgCar.focus);
            imgCar.right();
            display();
        }
    }
    function displayClear () {
        let frame = document.getElementById('imageContainer');
        while (frame.firstChild) {
            frame.removeChild(frame.firstChild);
        }
        let dots = document.getElementById('navigationDots');
        while (dots.firstChild) {
            dots.removeChild(dots.firstChild);
        }
    }
    function display () {
        displayClear();
        let frame = document.getElementById('imageContainer');
        let img = document.createElement('img');
        if (imgCar.getFocus() == 1)
        {
            img.src = "../data/home-isometric-1.jpg";
        }
        else if (imgCar.getFocus() == 2)
        {
            img.src = "../data/home-isometric-2.jpg";
        }
        else if (imgCar.getFocus() == 3)
        {
            img.src = "../data/home-isometric-3.jpg";
        }
        frame.appendChild(img);
        let dots = document.getElementById('navigationDots');
        for (let i = 0; i < imgCar.getSize(); i++)
        {
            let dot = document.createElement('button');
            dot.setAttribute('class', "navigationDot");
            if (i+1 == imgCar.getFocus())
            {
                dot.setAttribute('id', "pickedDot");
            }
            dot.addEventListener('click', shiftFocus(i+1));
            dots.appendChild(dot);
        }
    }
    let left = document.getElementById('leftArrow');
    left.addEventListener('click', shiftLeft());
    let right = document.getElementById('rightArrow');
    right.addEventListener('click', shiftRight());
    display();
    window.setInterval(shiftRight(), 5000);
}
main();
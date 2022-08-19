function add (x, y)
{
    return x + y;
}

function subtract (x, y)
{
    return x - y;
}

function multiply (x, y)
{
    return x * y;
}

function divide (x,y)
{
    return x/y;
}

function operate (x,y, operator)
{
    if (operator == '+') {return add(x,y);}
    else if (operator == '-') {return subtract(x,y);}
    else if (operator == '*') {return multiply(x,y);}
    else if (operator == '/') {return divide(x,y);}
    else {console.log('ERROR: unsupported operator')}
}

function updateDisplay()
{
    display.innerText = displayValue;
}

let displayValue = "";
let display = document.getElementById('displayText');
let digits = document.getElementsByClassName('digit');
for (let i = 0; i < digits.length; i++) 
{
    let number = digits[i].innerText;
    digits[i].addEventListener('click',() => {
        // console.log(displayValue);
        displayValue = displayValue + number
        updateDisplay();
    });
}
updateDisplay();


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

let display = document.getElementById('displayText');
function updateDisplay()
{
    display.innerText = displayValue;
}

let displayValue = "";
let firstOperand = "";
let operator = "";
let secondOperand = "";
let digits = document.getElementsByClassName('digit');
for (let i = 0; i < digits.length; i++) 
{
    let number = digits[i].innerText;
    digits[i].addEventListener('click',() => {
        // console.log(displayValue);
        displayValue = displayValue + number
        // update parameters
        if (operator == "")
        {
            firstOperand += number;
        }
        else
        {
            secondOperand += number;
        }
        updateDisplay();
    });
}
let operators = document.getElementsByClassName('operator');
for (let i = 0; i < operators.length; i++) 
{
    operators[i].addEventListener('click',() => {
        operator = operators[i].innerText;
        console.log(operator);
        displayValue = displayValue + operator
        updateDisplay();
    });
}
let clearButton = document.getElementsByClassName('clear');
clearButton[0].addEventListener('click', () => {
    displayValue = "";
    firstOperand = "";
    operator = ""
    secondOperand = "";
});
let equalsButton = document.getElementsByClassName('equals');
equalsButton[0].addEventListener('click', () => {
    displayValue = operate(parseInt(firstOperand), parseInt(secondOperand), operator);
    updateDisplay();
    //reset values while allowing for 'chaining' operations using result
    firstOperand = displayValue;
    operator = ""
    secondOperand = "";
});
updateDisplay();


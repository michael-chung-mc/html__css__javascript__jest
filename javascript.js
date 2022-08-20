let error = false;
let displayValue = "";
let firstOperand = "";
let operator = "";
let secondOperand = "";

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

function clearDisplay()
{
    error = false;
    displayValue = "";
    firstOperand = "";
    operator = ""
    secondOperand = "";
    updateDisplay();
}

function evaluate ()
{
    // check for valid operands
    if (operator == "")
    {
        error = true;
        displayValue = "NO-OPERATOR";
        firstOperand = "";
        operator = ""
        secondOperand = "";
    }
    else if (operator == "/" && secondOperand == "0")
    {
        error = true;
        // check for divide by zero
        displayValue = "DIV-ZERO";
        firstOperand = "";
        operator = ""
        secondOperand = "";
    }
    else if (firstOperand == "")
    {
        // assumes operator exists
        displayValue = operate(0, parseFloat(secondOperand), operator);
        displayValue = Math.round(displayValue * 1000)/1000;
        firstOperand = displayValue;
        operator = ""
        secondOperand = "";
    }
    else if (secondOperand == "")
    {
        // assumes operator exists
        displayValue = operate(parseFloat(firstOperand), 0, operator);
        displayValue = Math.round(displayValue * 1000)/1000;
        firstOperand = displayValue;
        operator = ""
        secondOperand = "";
    }
    else
    {
        displayValue = operate(parseFloat(firstOperand), parseInt(secondOperand), operator);
        displayValue = Math.round(displayValue * 1000)/1000;
        //reset values while allowing for 'chaining' operations using result
        firstOperand = displayValue;
        operator = ""
        secondOperand = "";
    }
    updateDisplay();
}

let digits = document.getElementsByClassName('digit');
for (let i = 0; i < digits.length; i++) 
{
    let number = digits[i].innerText;
    digits[i].addEventListener('click',() => {
        // console.log(displayValue);
        if (error)
        {
            clearDisplay();
        }
        else {
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
        }
    });
}
let operators = document.getElementsByClassName('operator');
for (let i = 0; i < operators.length; i++) 
{
    operators[i].addEventListener('click',() => {
        if (error)
        {
            clearDisplay();
        }
        else if (operator != "")
        {
            //evaluate current operation before allowing another operator
            evaluate();
        }
        else {
            operator = operators[i].innerText;
            // console.log(operator);
            displayValue = displayValue + operator
            updateDisplay();
        }
    });
}
let clearButton = document.getElementsByClassName('clear');
clearButton[0].addEventListener('click', clearDisplay);

let equalsButton = document.getElementsByClassName('equals');
equalsButton[0].addEventListener('click', evaluate);
updateDisplay();


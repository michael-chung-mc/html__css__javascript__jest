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
    }
    else if (operator == "/" && secondOperand == "0")
    {
        error = true;
        // check for divide by zero
        displayValue = "DIV-ZERO";
        firstOperand = "";
    }
    else if (firstOperand == "")
    {
        // assumes operator exists
        displayValue = operate(0, parseFloat(secondOperand), operator);
        displayValue = Math.round(displayValue * 1000)/1000;
        firstOperand = displayValue;
    }
    else if (secondOperand == "")
    {
        // assumes operator exists
        displayValue = operate(parseFloat(firstOperand), 0, operator);
        displayValue = Math.round(displayValue * 1000)/1000;
        firstOperand = displayValue;
    }
    else
    {
        displayValue = operate(parseFloat(firstOperand), parseFloat(secondOperand), operator);
        displayValue = Math.round(displayValue * 1000)/1000;
        //reset values while allowing for 'chaining' operations using result
        firstOperand = displayValue;
    }
    operator = ""
    secondOperand = "";
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
let clearButton = document.getElementsByClassName('clear')[0];
clearButton.addEventListener('click', clearDisplay);

let equalsButton = document.getElementsByClassName('equals')[0];
equalsButton.addEventListener('click', evaluate);

let decimal = document.getElementsByClassName('period')[0];
decimal.addEventListener('click', () => {
    //console.log(`${firstOperand} to ${secondOperand}`)
    if (error)
    {
        clearDisplay();
    }
    else if (operator == "" && !firstOperand.toString().match(/\./))
    {
        firstOperand += ".";
        displayValue = displayValue + decimal.innerText;
        updateDisplay();
    }
    else if (operator != "" && !secondOperand.toString().match(/\./))
    {
        secondOperand += ".";
        displayValue = displayValue + decimal.innerText;
        updateDisplay();
    }
});

let undo = document.getElementsByClassName('back')[0];
undo.addEventListener('click', () => {
    if (error)
    {
        clearDisplay();
    }
    else if (displayValue.length > 0)
    {
        let last = displayValue[displayValue.length -1];
        if (last == operator)
        {
            operator = "";
        }
        else if (operator == "")
        {
            firstOperand = firstOperand.slice(0,firstOperand.length-1);
        }
        else if (operator != "")
        {
            secondOperand = secondOperand.slice(0,secondOperand.length-1);
        }
        displayValue = displayValue.slice(0,displayValue.length-1);
        updateDisplay();
    }
});

updateDisplay();


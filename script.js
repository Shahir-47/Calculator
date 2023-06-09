let a;
let b;
let operator = '';
let result;

const add = function (a, b) {
    return a + b;
  };
  
const subtract = function (a, b) {
    return a - b;
};

const multiply = function (a, b) {
    return a * b;
}

const divide = function (a, b) {   
    return a / b;
}

const operate = function (operator, a, b) {
    if (operator === '+') {
        return add(a, b);
    } else if (operator === '-') {
        return subtract(a, b);
    } else if (operator === 'x') {
        return multiply(a, b);
    } else if (operator === '÷') {
        if (divide(a, b) === Infinity) {
            let display = document.querySelector('.display__history');
            display.color = 'black';
            display.textContent = a + " " + operator + " " + b + ' =';
        }
        return divide(a, b);
    }


}

function updateDisplay(a) {
    let display = document.querySelector('.display__result');
    display.color = 'black';
    display.textContent = a;
}

function historyDisplay() {
    let display = document.querySelector('.display__history');
    display.color = 'black';
    if (a !== undefined) {
        console.log("line 45: " + a);
        display.textContent = a + " " + operator;
    }
}

function clearDisplay() {
    let display = document.querySelector('.display__result');
    display.textContent = '';
    display = document.querySelector('.display__history');
    display.textContent = '';
}

const equalsButton = document.querySelector('.buttons__item--equal');
equalsButton.addEventListener('click', () => {
    let display = document.querySelector('.display__history');
    display.color = 'black';
    if (!isNaN(a) && !isNaN(b)) {
        result = operate(operator, a, b);
        if (result === Infinity) {
            clearResult();
            display.textContent = a + " " + operator + " " + b + ' =';
            a = undefined;
            b = undefined;
            operator = '';
            updateDisplay('Error');
            console.log("line 67: " + a + " " + operator + " " + b);
        }
        else{
            updateDisplay(result);
            display.textContent = a + " " + operator + " " + b + ' =';
        }
    }
});

const clearButton = document.querySelector('.buttons__item--clear');
clearButton.addEventListener('click', () => {
    clearDisplay();
    a = undefined;
    b = undefined;
    operator = '';
});

function deleteLast() {
    let equalSign = document.querySelector('.display__history');
    equalSign.color = 'black';

    let display = document.querySelector('.display__result');


    // if (equalSign.textContent.indexOf('=') > -1 && display.textContent !== 'Error'){
    //     display.textContent = display.textContent.slice(0, -1);
    //     if (display.textContent.length === 0) {
    //         display.textContent = 0;
    //         alert('Cannot delete the result');
    //     }
    //     a = display.textContent;
    //     console.log("line 107: " + a);

    // }
    if (display.textContent !== 'Error') {
    
        display.textContent = display.textContent.slice(0, -1);
        if (display.textContent.length === 0) {
            display.textContent = 0;
        }
        console.log("line 97: " + a);
        if (b == undefined) {

            a = parseInt(a.toString().slice(0, -1));
            if (isNaN(a) || a === 0) {
                a = 0;
            }
            console.log("line 99: " + a);
        }
        else {
            console.log("line 102: " + b);
            b = parseInt(b.toString().slice(0, -1));
            if (isNaN(b) || b === 0) {
                b = 0;
            }
            console.log("line 104: " + b); 
        }
    } else if (display.textContent === 'Error'){
        clearDisplay();
        a = undefined;
        b = undefined;
        operator = '';
    }
}

const deleteButton = document.querySelector('.buttons__item--backspace');
deleteButton.addEventListener('click', () => {
    deleteLast();
});

function clearResult() {
    let display = document.querySelector('.display__result');
    display.textContent = '';
}

function calcActions() {
    const numberButtons = document.querySelectorAll('.buttons__item--number');
    numberButtons.forEach((button) => {
        button.addEventListener('click', () => {
            if (a === undefined) {
                a = 0;
            }
            if (operator === '') {
                a = parseInt(a + button.textContent);
                updateDisplay(a);
            }
            else {
                if (b === undefined) {
                    b = 0;
                }
                console.log(b);
                b = parseInt(b + button.textContent);
                updateDisplay(b);
            }
            console.log(a + " " + operator + " " + b);
        });
    });

    const operatorButtons = document.querySelectorAll('.buttons__item--operator');
    operatorButtons.forEach((button) => {
        button.addEventListener('click', () => {
            lastOperator = operator;
            operator = button.textContent;
            console.log(b);
            if (a !== undefined && b !== undefined) {
                a = operate(lastOperator, a, b);
                console.log(a);
                if (a === Infinity || isNaN(a)) {
                    clearResult();
                    a = undefined;
                    b = undefined;
                    operator = '';
                    updateDisplay('Error');
                    console.log("line 131: " + a + " " + operator + " " + b);
                } else {
                    updateDisplay(a);
                    b = undefined;
                }
            }
            historyDisplay();
        });
    });
}

calcActions();

let a;
let b;
let operator = '';

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

// function clearDisplay() {
//     let display = document.querySelector('.display__result');
//     display.textContent = '';
//     display = document.querySelector('.display__history');
//     display.textContent = '';
// }

const equalsButton = document.querySelector('.buttons__item--equal');
equalsButton.addEventListener('click', () => {
    let display = document.querySelector('.display__history');
    let result;
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

// const clearButton = document.querySelector('.buttons__item--clear');
// clearButton.addEventListener('click', () => {
//     clearDisplay();
//     a = 0;
//     b = 0;
//     operator = '';
// });

// function deleteLast() {
//     let display = document.querySelector('.display__result');
//     display.textContent = display.textContent.slice(0, -1);
// }

// const deleteButton = document.querySelector('.buttons__item--delete');
// deleteButton.addEventListener('click', () => {
//     deleteLast();
// });

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

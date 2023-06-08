let a = 0;
let b = 0;
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
    } else if (operator === '*') {
        return multiply(a, b);
    } else if (operator === '/') {
        return divide(a, b);
    }
}

function updateDisplay() {
    let display = document.querySelector('.display__result');
    display.color = 'black';
    display.textContent = parseInt(a);
    if (operator != '') {
        display.textContent = parseInt(b);
    }
}

function historyDisplay() {
    let display = document.querySelector('.display__history');
    display.color = 'black';
    display.textContent = a;
    display.textContent += operator;
}

// function clearDisplay() {
//     let display = document.querySelector('.display__result');
//     display.textContent = '';
//     display = document.querySelector('.display__history');
//     display.textContent = '';
// }

// const equalsButton = document.querySelector('.buttons__item--equals');
// equalsButton.addEventListener('click', () => {
//     a = operate(operator, a, b);
//     updateDisplay();
//     operator = '';
//     b = 0;
// });

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

const numberButtons = document.querySelectorAll('.buttons__item--number');
numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (operator === '') {
            a = parseInt(a + button.textContent);
        }
        else {
            b = parseInt(b + button.textContent);
        }
        console.log(a + " " + operator + " " + b);
        updateDisplay();
    });
});

const operatorButtons = document.querySelectorAll('.buttons__item--operator');
operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        operator = button.textContent;
        if (a != 0 && b!=0) {
            a = operate(operator, a, b);
            updateDisplay();
            operator = '';    
            b = 0;
        }
        historyDisplay();
    });
});
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

const recursiveFactorial = function (n) {
    if (n > 18){
        return 'Overflow';
    }
    else {
        if (n === 0) {
            return 1;
        }
        return n * recursiveFactorial(n - 1);
    }
};

const power = function (a, b) {
    return Math.pow(a, b);
};

const operate = function (operator, a, b) {
    if (a >= 999999999999999 || a <= -999999999999999 || b >= 999999999999999 || b <= -999999999999999){
        
        return 'Overflow';
    } 
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
            a = undefined;
            b = undefined;
            operator = '';
            updateDisplay('Error');
        }
        return divide(a, b);
    } else if (operator === '^') {
        return power(a, b);
    }
};

function updateDisplay(a) {
    let display = document.querySelector('.display__result');
    display.color = 'black';
    display.textContent = a;
}

function historyDisplay() {
    let display = document.querySelector('.display__history');
    display.color = 'black';
    if (a !== undefined) {
        
        display.textContent = a + " " + operator;
    }
}

function clearDisplay() {
    let display = document.querySelector('.display__result');
    display.textContent = '';
    display = document.querySelector('.display__history');
    display.textContent = '';
}

// for the equals button
const equalsButton = document.querySelector('.buttons__item--equal');
equalsButton.addEventListener('click', () => {
    let display = document.querySelector('.display__history');
    display.color = 'black';
    if (!isNaN(a) && !isNaN(b)) {
        result = operate(operator, parseFloat(a), parseFloat(b));
        
        if (result >= 999999999999999 || result <= -999999999999999) {
            result = 'Overflow';
        }
        if (result.toString().length > 16) {
            result = parseFloat(result).toFixed(16);
            result = result.slice(0, -2)
        }
        if (result === Infinity || isNaN(result) && result !== 'Overflow') {
            clearResult();
            display.textContent = a + " " + operator + " " + b + ' =';
            a = undefined;
            b = undefined;
            operator = '';
            updateDisplay('Error');
            
        } else if (result === 'Overflow') {
            clearDisplay();
            a = undefined;
            b = undefined;
            operator = '';
            updateDisplay('Overflow');
        }
        else{
            updateDisplay(result);
            display.textContent = a + " " + operator + " " + b + ' =';
        }
    }
});

// clear button
const clearButton = document.querySelector('.buttons__item--clear');
clearButton.addEventListener('click', () => {
    clearDisplay();
    a = undefined;
    b = undefined;
    operator = '';
});


// undo last number
function deleteLast() {
    let equalSign = document.querySelector('.display__history');
    equalSign.color = 'black';

    let display = document.querySelector('.display__result');


    if (equalSign.textContent.indexOf('=') > -1 && display.textContent !== 'Error'){
        display.textContent = display.textContent.slice(0, -1);
        if (display.textContent.length === 0) {
            display.textContent = 0;
        }
    }
    else {

        if (display.textContent !== 'Error') {
        
            display.textContent = display.textContent.slice(0, -1);
            if (display.textContent.length === 0) {
                display.textContent = 0;
            }
            
            if (b == undefined) {

                a = parseFloat(a.toString().slice(0, -1));
                if (isNaN(a) || a === 0) {
                    a = 0;
                }
                
            }
            else {
                
                b = parseFloat(b.toString().slice(0, -1));
                if (isNaN(b) || b === 0) {
                    b = 0;
                }
                 
            }
        } else if (display.textContent === 'Error'){
            clearDisplay();
            a = undefined;
            b = undefined;
            operator = '';
        }
    }
}


// backspace button
const deleteButton = document.querySelector('.buttons__item--backspace');
deleteButton.addEventListener('click', () => {
    deleteLast();
});

// factorial button
const factorialButton = document.querySelector('.buttons__item--factorial');
factorialButton.addEventListener('click', () => {
    let display = document.querySelector('.display__result');
    let equalSign = document.querySelector('.display__history');
    if (!(equalSign.textContent.indexOf('!') > -1)) {
        if (display.textContent !== 'Error') {
            if (equalSign.textContent.indexOf('=') > -1) {
                a = Number(display.textContent);
                b = undefined;
            }
            if (b !== undefined) {
                equalSign.textContent = equalSign.textContent + display.textContent + '!';
                if (Math.abs(b) > 18) {
                    clearResult();
                    a = undefined;
                    b = undefined;
                    operator = '';
                    updateDisplay('Overflow');
                } else if (Number.isInteger(parseFloat(b)) === false) {
                    clearResult();
                    a = undefined;
                    b = undefined;
                    operator = '';
                    updateDisplay('Error');
                }
                else {
                    b = parseFloat(parseFloat(recursiveFactorial(parseFloat(display.textContent))));
                    if (b == 'Overflow') {
                        clearDisplay();
                        a = undefined;
                        b = undefined;
                        operator = '';
                        updateDisplay('Overflow');
                    } else {
                        
                        display.textContent = operate(operator, parseFloat(equalSign.textContent), parseFloat(b));
                    }
                }
            } else {
                equalSign.textContent = display.textContent + '!';
                
                if (Math.abs(a) > 18) {
                    clearDisplay();
                    a = undefined;
                    b = undefined;
                    operator = '';
                    updateDisplay('Overflow');
                } else if (Number.isInteger(parseFloat(a)) === false && a !== undefined) {
                    clearDisplay();
                    a = undefined;
                    b = undefined;
                    operator = '';
                    updateDisplay('Error');
                } else {
                    if (a === undefined) {
                        display.textContent = 0;
                        equalSign.textContent = display.textContent + '!';
                    }
                    if (a < 0) {
                        a = parseFloat(parseFloat(recursiveFactorial(Math.abs(parseFloat(display.textContent)))));
                        a = -a;
                    } else {
                        a = parseFloat(parseFloat(recursiveFactorial(parseFloat(display.textContent))));
                    }
                    
                    if (a == 'Overflow') {
                        clearDisplay();
                        a = undefined;
                        b = undefined;
                        operator = '';
                        updateDisplay('Overflow');
                    } else {
                        
                        display.textContent = a;
                    }
                }
            }
        }
    }
});

function clearResult() {
    let display = document.querySelector('.display__result');
    display.textContent = '';
}

// number and operator buttons
function calcActions() {
    let display = document.querySelector('.display__result');
    let equalSign = document.querySelector('.display__history');
    equalSign.color = 'black';

    //number
    const numberButtons = document.querySelectorAll('.buttons__item--number');
    numberButtons.forEach((button) => {
        button.addEventListener('click', () => {
            if (a === undefined) {
                a = 0;
            }

            if (a > 999999999999999) {
                Array(15).fill('a');
            }
            else if (a < -999999999999999) {
                Array(15).fill('a');
            }

            if (b > 999999999999999) {
                Array(15).fill('b');
            }
            else if (b < -999999999999999) {
                Array(15).fill('b');
            }

            if (operator === '') {
                if (a < 999999999999999 && a > -999999999999999) {
                    
                    a = a + button.textContent;

                    let occurrences_a = a.split('.').length - 1;
                    if (occurrences_a > 1) {
                        a = a.slice(0, -1);
                    }

                    if (a.length > 16) {
                        a = parseFloat(a).toFixed(16);
                        a = a.slice(0, -2)
                    }

                    
                    if (a.indexOf('.') > -1 && Number.isInteger(a[a.indexOf('.') + 1])) {
                        let temp = a.split('.');
                        
                        if (temp[1].length > 15) {
                            a = parseFloat(a).toFixed(15);
                        }
                        temp[0] = parseFloat(temp[0]);
                        a = parseFloat(temp.join('.'));
                    } else if (a.indexOf('.') > -1) {
                        a = a
                    } else {
                        a = parseFloat(a);
                    }
                    updateDisplay(a);
                }
            }
            else{
                if (equalSign.textContent.indexOf('=') > -1) {
                    updateDisplay(display.textContent+=button.textContent);
                }
                else {
                    if (b === undefined) {
                        b = 0;
                    }
                    
                    if (b < 999999999999999 && b > -999999999999999) {
                        b = b + button.textContent;

                        let occurrences_b = b.split('.').length - 1;
                        if (occurrences_b > 1) {
                            b = b.slice(0, -1);
                        }

                        if (b.length > 16) {
                            b = parseFloat(b).toFixed(16);
                            b = b.slice(0, -2)
                        }

                        if (b.indexOf('.') > -1 && Number.isInteger(b[b.indexOf('.') + 1])) {
                            let temp = b.split('.');
                            
                            if (temp[1].length > 15) {
                                b = parseFloat(b).toFixed(15);
                            }
                            temp[0] = parseFloat(temp[0]);
                            b = parseFloat(temp.join('.'));
                        } else if (b.indexOf('.') > -1) {
                            b = b
                        } else {
                            b = parseFloat(b);
                        }
                        updateDisplay(b);
                    }
                }
            }
            equalSign.color = 'black';
            equalSign.textContent = a + " " + operator;
            
        });
    });

    // operator
    const operatorButtons = document.querySelectorAll('.buttons__item--operator');
    operatorButtons.forEach((button) => {
        button.addEventListener('click', () => {
            if (display.textContent === 'Error' || display.textContent === 'Overflow') {
                clearDisplay();
                a = undefined;
                b = undefined;
                operator = '';
                if (display.textContent === 'Error') {
                    updateDisplay('Error');
                }
                else {
                    updateDisplay('Overflow');
                }
            } else {
                lastOperator = operator;
                operator = button.textContent;
                
                if (a !== undefined && b !== undefined) {
                    a = operate(lastOperator, parseFloat(a), parseFloat(b));
                    if (a >= 999999999999999 || a <= -999999999999999) {
                        a = 'Overflow';
                    }
                    
                    if (a.toString().length > 16) {
                        a = parseFloat(a).toFixed(16);
                        a = a.slice(0, -2)
                        
                    }
                    
                    if (equalSign.textContent.indexOf('=') > -1 && (display.textContent !== 'Error' || display.textContent !== 'Overflow')) {
                        a = parseFloat(display.textContent);
                    }
                    if ((a === Infinity || isNaN(a)) && a !== 'Overflow') {

                        
                        clearResult();
                        a = undefined;
                        b = undefined;
                        operator = '';
                        updateDisplay('Error');
                        
                    } else if (a === 'Overflow'){
                        clearDisplay();
                        a = undefined;
                        b = undefined;
                        operator = '';
                        updateDisplay('Overflow');
                        
                    } else {
                        updateDisplay(a);
                        b = undefined;
                    }
                }
                historyDisplay();
            }
        });
    });
}

// call to operator and number buttons
calcActions();


// keyboard support
document.addEventListener('keydown', (event) => {
    let display = document.querySelector('.display__result');
    let equalSign = document.querySelector('.display__history');
    equalSign.color = 'black';

    
    event.preventDefault();

     // Helper function to simulate a click
    function handleButtonClick(selector) {
        const button = document.querySelector(selector);
        
        const tempColor = window.getComputedStyle(button).backgroundColor;
        
        const darkerColor = darkenColor(tempColor);
        

        button.click();
        button.style.backgroundColor = darkerColor;
        button.classList.add('active');
        setTimeout(() => {
            button.style.backgroundColor = tempColor;
            button.classList.remove('active');
        }, 100); // Remove the "active" class after a short delay
    }
     
    if (event.key === 'Enter' || event.key === '=' || event.code === 'NumpadEnter') {
        handleButtonClick('.buttons__item--equal');
    } 
    else if (event.key === 'Backspace') {
        handleButtonClick('.buttons__item--backspace');
    } 
    else if (event.key === 'Escape' || event.key === 'c' || event.key === 'C' || event.key === 'Delete') {
        handleButtonClick('.buttons__item--clear');
    }
    else if (event.key >= '0' && event.key <= '9' || (!isNaN(event.code.slice(-1))) && event.code.startsWith('Numpad')) {
        const num = parseInt(event.key) === isNaN(parseInt(event.key)) ? event.key : event.code.slice(-1);
        handleButtonClick(`.num-${num}`);
    }
    else if (event.key === '.' || event.code === 'NumpadDecimal') {
        handleButtonClick('.num-dot');
    } 
    else if (event.key === '+') {
        handleButtonClick('.num-plus');
    } 
    else if (event.key === '-') {
        handleButtonClick('.num-minus');
    } 
    else if (event.key === '*' || event.key === 'x' || event.key === 'X') {
        handleButtonClick('.num-multiply');
    } 
    else if (event.key === '/') {
        handleButtonClick('.num-divide');
    } 
    else if (event.key === '^') {
        handleButtonClick('.num-power');
    } 
    else if (event.key === '!') {
        handleButtonClick('.buttons__item--factorial');
    }
});

// Helper function to darken a color
function darkenColor(color, amount = 80) {
    // Remove the "rgb()" or "rgba()" part and extract the RGB values
    const rgbValues = color.replace(/^(rgb|rgba)\(/, '').replace(/\)$/, '').split(',');
    
    
    // Convert the RGB values to integers
    let r = parseInt(rgbValues[0]);
    let g = parseInt(rgbValues[1]);
    let b = parseInt(rgbValues[2]);

    // Darken the color by the specified amount
    r = r - amount;
    g = g - amount;
    b = b - amount;

    // Generate the new darker color in RGB format
    const darkerColor = 'rgb(' + r + ',' + g + ',' + b + ')';
    
    return darkerColor;
  }

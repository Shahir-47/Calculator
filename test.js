document.addEventListener('keydown', (event) => {
    let display = document.querySelector('.display__result');
    let equalSign = document.querySelector('.display__history');
    equalSign.color = 'black';

    console.log(event);
    event.preventDefault();

    function handleButtonClick(selector) {
        const button = document.querySelector(selector);
        button.click();
        button.classList.add('active');

        setTimeout(() => {
            button.classList.remove('active');
        }, 100); // Remove the "active" class after a short delay
    }

    if (event.key === 'Enter' || event.key === '=' || event.code === 'NumpadEnter') {
        handleButtonClick('.buttons__item--equal');
    } 
    else if (event.key === 'Backspace') {
        handleButtonClick('.buttons__item--backspace');
        deleteLast();
    } 
    else if (event.key === 'Escape' || event.key === 'c' || event.key === 'C' || event.key === 'Delete') {
        handleButtonClick('.buttons__item--clear');
    } 
    else if (event.key >= '0' && event.key <= '9' || event.code.startsWith('Numpad')) {
        const num = event.key === 'NumpadDecimal' ? '.' : event.key;
        handleButtonClick(`.num-${num}`);
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
This refactored version reduces repetition by utilizing the handleButtonClick helper function to handle button clicks and add/remove the active class. It also handles number keys in a more generalized way using a range check and constructs the corresponding selector dynamically.







// Script file for calculator

function add(num1, num2) {
    return +num1 + +num2;
}

function subtract(num1, num2) {
    return +num1 - +num2;
}

function multiply(num1, num2) {
    return +num1 * +num2;
}

function divide(num1, num2) {
    if(+num2 !== 0)
        return +num1 / +num2;
}

// Object to store the current system state
let state = {
    id: 0,
    bufferDisplay: "",
    mainDisplay: "0",
    currentValue: 0
}

// Function to update the display based on the current state
function refreshDisplay() {
    const bufferDisplay = document.querySelector('.calc-input-buffer');
    const mainDisplay = document.querySelector('.calc-input-main');
    bufferDisplay.value = state.bufferDisplay;
    mainDisplay.value = state.mainDisplay;
}

// Function to handle number button inputs

function numberButtonClick(e) {
    console.log(e.target.textContent);
    const buttonValue = e.target.textContent;
    const mainDisplayValue = state.mainDisplay;
    if(state.id === 0) {
        state.currentValue = +(mainDisplayValue + buttonValue)
        state.mainDisplay = state.currentValue;
        console.log("Absorbing number: " + state.currentValue);
    } else if(state.id === 1) {
        
    }
    refreshDisplay();
}

const numberButtons = [...document.querySelectorAll('.calc-button.num')];
numberButtons.forEach( button => {
        button.addEventListener('click', e => numberButtonClick(e));
    }
)

const operatorButtons = [...document.querySelectorAll('.calc-button.op')];
operatorButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        console.log(e.target.textContent)
    })
})

const equalButton = document.querySelector('.calc-button.eq');
equalButton.addEventListener('click', (e) => {
    console.log(e.target.textContent);
})

const floatButton = document.querySelector('.calc-button.float');
floatButton.addEventListener('click', (e) => {
    console.log(e.target.textContent);
})

const clearButton = document.querySelector('.calc-button.clear');
clearButton.addEventListener('click', (e) => {
    console.log(e.target.textContent);
})

const deleteButton = document.querySelector('.calc-button.delete');
deleteButton.addEventListener('click', (e) => {
    console.log(e.target.textContent);
})
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
        return +num1 / +num2;
}

// Constants
const con = {
    FLOAT: ".",
    SUM: "+",
    MINUS: "-",
    TIMES: "x",
    BY: "/",
    EQ: "=",
}

// Object to store the current system state
let state = {
    startFloat: false,
    opChainStart: false,
    bufferDisplay: "",
    mainDisplay: "0",
    op1: undefined,
    op2: undefined,
    operation: "",
}

const bufferDisplay = document.querySelector('.calc-input-buffer');
const mainDisplay = document.querySelector('.calc-input-main');

function performOperation() {
    switch(state.operation) {
        case con.SUM:   state.op1 = add(state.op1, state.op2);
                        break;
        case con.MINUS: state.op1 = subtract(state.op1, state.op2);
                        break;
        case con.TIMES: state.op1 = multiply(state.op1, state.op2);
                        break;
        case con.BY:    if(state.op2 !== 0)
                            state.op1 = divide(state.op1, state.op2);
                        else {
                            // Handle divide by 0 error
                        }
                        break;
    }
    state.op1 = Math.round(state.op1 * 1000000)/1000000;
}

// Function to update the display based on the current state
function refreshBufferDisplay() {
    console.log("Refreshing buffer display");
    bufferDisplay.value = state.bufferDisplay;
}

function refreshMainDisplay() {
    console.log("Refreshing main display");
    mainDisplay.value = state.mainDisplay;
}

const numberButtons = [...document.querySelectorAll('.calc-button.num')];
numberButtons.forEach( button => {
        button.addEventListener('click', e => {
            console.log("e.target.textContent: " + e.target.textContent);
            if(state.startFloat && e.target.textContent === "0")
                state.mainDisplay += "0";
            else
                state.mainDisplay = "" + +(state.mainDisplay + e.target.textContent);
            console.log("state.mainDisplay: " + state.mainDisplay);
            console.log("state.bufferDisplay: " + state.bufferDisplay);
            refreshMainDisplay();
        });
    }
)

const operatorButtons = [...document.querySelectorAll('.calc-button.op')];
operatorButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        state.startFloat = false;
        if(!state.opChainStart) {
            state.opChainStart = true;
            state.op1 = +state.mainDisplay;
            state.bufferDisplay = state.mainDisplay + e.target.textContent;
            refreshBufferDisplay();
            state.mainDisplay = "";
            state.operation = e.target.textContent;
        } else {
            // Actually perform operation from previous part
            state.op2 = +state.mainDisplay;
            performOperation();
            state.operation = e.target.textContent;
            state.mainDisplay = "";
            state.bufferDisplay = "" + state.op1 + state.operation;
        }
        refreshBufferDisplay();
    })
})

const equalButton = document.querySelector('.calc-button.eq');
equalButton.addEventListener('click', (e) => {
    console.log(e.target.textContent);
    state.op2 = +state.mainDisplay;
    state.bufferDisplay += state.op2 + con.EQ;
    refreshBufferDisplay();
    state.bufferDisplay= "" + state.op1;
    performOperation();
    state.mainDisplay = state.op1;
    state.op2 = undefined;
    refreshMainDisplay();
    state.opChainStart = false;
    console.log("state.mainDisplay: " + state.mainDisplay);
    console.log("(\"\" + state.mainDisplay).search(con.FLOAT): " + ("" + state.mainDisplay).search(con.FLOAT));
    if(("" + state.mainDisplay).search(con.FLOAT) !== -1)
        state.startFloat = true;
})

const floatButton = document.querySelector('.calc-button.float');
floatButton.addEventListener('click', (e) => {
    console.log(e.target.textContent);
    if(!state.startFloat) {
        state.startFloat = true;
        state.mainDisplay += con.FLOAT;
        refreshMainDisplay();
    }
})

const clearButton = document.querySelector('.calc-button.clear');
clearButton.addEventListener('click', (e) => {
    console.log(e.target.textContent);
    state.mainDisplay = "0";
    refreshMainDisplay();
    state.bufferDisplay = ""
    refreshBufferDisplay();
    state.op1 = state.op2 = undefined;
    state.operator = "";
    state.startFloat = false;
    state.opChainStart = false;

})

const deleteButton = document.querySelector('.calc-button.delete');
deleteButton.addEventListener('click', (e) => {
    console.log(e.target.textContent);
    //console.log(mainDisplay.value.slice(0, -1));
    const lastChar = mainDisplay.value.slice(-1);
    console.log("lastChar: " + lastChar);
    if(lastChar === con.FLOAT)
        state.startFloat = false;
    state.mainDisplay = mainDisplay.value.slice(0, -1);
    refreshMainDisplay();
})

// Initial Refresh
refreshMainDisplay();
// Global variables
let liveNum = "";
let historyNum = "";
let operand = "";

// DOM selection variables
const liveInput = document.querySelector('.live');
const historyInput = document.querySelector('.history');
const numberBtn = document.querySelectorAll('div.inputs > div.number');
const LiveOperator = document.querySelector('.liveOperator');
const pointBtn = document.querySelector('div.float');
const minusBtn = document.querySelector('.minus');
const deleteBtn = document.querySelector('div.delete');
const clearBtn = document.querySelector('div.clear');
const operandBtn = document.querySelectorAll('div.inputs > div.operand');
const enterBtn = document.querySelector('.enter');

// Click events listeners
numberBtn.forEach((e) => {
    e.addEventListener('click', () => {
        addNumber(e.innerHTML);
    });
});

pointBtn.addEventListener('click', () => {
    if (liveNum.includes(".")) {
        return liveNum;
    } else {
        addNumber(".");
    };
});

minusBtn.addEventListener('click', () => addMinus());

deleteBtn.addEventListener('click', () => deleteNumber(liveNum));

clearBtn.addEventListener('click', () => clearAll());

operandBtn.forEach((e) => {
    e.addEventListener('click', () => {
        showOperand(e.innerHTML);
        operate(e.innerHTML);
    });
});

enterBtn.addEventListener('click', () => result(liveNum, historyNum, operand));

// Keyboard events listeners
window.addEventListener('keydown', (e) => {
    const keyType = document.querySelector(`.inputs > div[data-key="${e.key}"]`);
    if (keyType.classList.value == "number") {
        addNumber(keyType.innerHTML);
    } else if (keyType.classList.value == "float") {
        if (liveNum.includes(".")) {
            return liveNum;
        } else {
            addNumber(".");
        };
    } else if (keyType.classList.value == "operand") {
        showOperand(keyType.innerHTML);
        operate(keyType.innerHTML);
    } else if (keyType.classList.value == "delete") {
        deleteNumber(liveNum);
    } else if (keyType.classList.value == "clear") {
        clearAll();
    } else if (keyType.classList.value == "minus") {
        addMinus();
    } else {
        result(liveNum, historyNum, operand);
    }
});


// Add a number to the live area
function addNumber(input) {
    let aLen = liveNum.toString().length;
    if (aLen >= 7) {
        liveInput.innerHTML = liveNum;
        return liveNum;
    } else {
        liveNum = liveNum + "" + input;
        liveInput.innerHTML = liveNum;
        return liveNum;
    }
};

// Delete last live number
function deleteNumber(d = liveNum) {
    let dLen = d.toString().length;
    if (dLen > 1) {
        const del = d.toString().slice(0, -1);
        liveInput.innerHTML = del;
        liveNum = parseFloat(del);
        dLen -= 1;
        return dLen;
    } else {
        liveNum = "";
        liveInput.innerHTML = liveNum;
        return dLen;
    }
}

// Add the possibility to switch actual live number to minus or positive
function addMinus() {
    if(liveNum[0] != "-") {
        liveNum = "-" + liveNum;
        liveInput.innerHTML = liveNum;
    } else {
        liveNum = liveNum.replace("-", "");
        liveInput.innerHTML = liveNum;
    }
    
    return liveNum;
};

// Show the actual operand in the calculator screen
function showOperand(sign) {
    LiveOperator.innerHTML = sign;
    return sign;
};

// Clear the calculator
function clearLive() {
    liveNum = "";
    liveInput.innerHTML = liveNum;
    return liveNum;
}

// Clear the history area of the calculator
function clearHistory() {
    historyNum = "";
    operand = "";
    historyInput.innerHTML = historyNum;
    LiveOperator.innerHTML = operand;
    return historyNum;
}

// Clear the live area of the calculator
function clearAll() {
    clearLive();
    clearHistory();
}

// Move number from live area to the history area
function moveHistory() {
    historyNum = liveNum;
    historyInput.innerHTML = historyNum;
    clearLive();
    return historyNum;
}

// Dynamic function to operate after selection of the operator
function operate(calc) {
    if (historyNum == "") {
        moveHistory(liveNum);
        operand = calc;
    } else if (liveNum == "") {
        operand = calc;
    } else {
        result(liveNum, historyNum, operand);
        operand = calc
    }
    return operand;
}

// Main operation
function result(a, b, o = operand) {
    if (liveNum == "" || historyNum == "") {
        return historyNum;
    } else {
        let res = 0;
        a = parseFloat(liveInput.innerHTML);
        b = parseFloat(historyInput.innerHTML);

        switch (o) {
            case "+":
                res = b + a;
                break;
            case "-":
                res = b - a;
                break;
            case "x":
                res = b * a;
                break;
            case "/":
                res = b / a;
                break;
            default:
                res = "Incorrect value";
                break;
        }
        res = parseFloat(res).toFixed(2);
        historyNum = res;
        historyInput.innerHTML = res;

        clearLive();
        showOperand("");

        return historyNum;
    }
}
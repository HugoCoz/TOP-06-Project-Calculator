let liveNum = "";
let historyNum = "";
let operand = "";

const liveInput = document.querySelector('.live');
const historyInput = document.querySelector('.history');
const numberBtn = document.querySelectorAll('div.inputs > div.number');
const deleteBtn = document.querySelector('div.delete');
const clearBtn = document.querySelector('div.clear');
const operandBtn = document.querySelectorAll('div.inputs > div.operand');
const enterBtn = document.querySelector('.enter');

numberBtn.forEach((e) => {
    e.addEventListener('click', () => {
        addNumber(parseInt(e.innerHTML));
    });
});

deleteBtn.addEventListener('click', () => deleteNumber(liveNum));

clearBtn.addEventListener('click', () => clearAll());

operandBtn.forEach((e) => {
    e.addEventListener('click', () => {
        operate(e.innerHTML);
    });
});

enterBtn.addEventListener('click', () => result(liveNum, historyNum, operand));

function addNumber(input) {
    liveNum = liveNum + "" + input;
    liveInput.innerHTML = liveNum;
    liveNum = parseInt(liveNum);
    return liveNum;
};

function deleteNumber(d = liveNum) {
    let dLen = d.toString().length;
    if (dLen > 1) {
        const del = d.toString().slice(0, -1);
        liveInput.innerHTML = del;
        liveNum = parseInt(del);
        dLen -= 1;
        return dLen;
    } else {
        liveNum = "";
        liveInput.innerHTML = liveNum;
        return dLen;
    }
}

function clearLive() {
    liveNum = "";
    liveInput.innerHTML = liveNum;
    return liveNum;
}

function clearHistory() {
    historyNum = "";
    historyInput.innerHTML = historyNum;
    return historyNum;
}

function clearAll() {
    clearLive();
    clearHistory();
}

function moveHistory(liveNum) {
    historyNum = liveNum;
    historyInput.innerHTML = historyNum;
    clearLive();
    return historyNum;
}

function operate(calc) {
    operand = calc;
    if (historyNum == "") {
        moveHistory(liveNum);
    } else {
        result(liveNum, historyNum, operand)
    }
    return operand;
}

function result(a = liveNum, b = historyNum, o = operand) {
    let res = 0;
    switch (o) {
        case "+":
            res = parseFloat(historyNum) + parseFloat(liveNum);
            break;
        case "-":
            res = parseFloat(historyNum) - parseFloat(liveNum);
            break;
        case "*":
            res = parseFloat(historyNum) * parseFloat(liveNum);
            break;
        case "/":
            res = parseFloat(historyNum) / parseFloat(liveNum);
            break;
        default:
            res = "Incorrect value";
            break;
    }
    clearLive();
    historyNum = res;
    historyInput.innerHTML = res;

    return res;
}
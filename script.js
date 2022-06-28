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

deleteBtn.addEventListener('click', () => deleteNumber());

clearBtn.addEventListener('click', () => clearNumber());

operandBtn.forEach((e) => {
    e.addEventListener('click', () => {
        moveHistory(liveNum);
        clearNumber();
        operand = e.innerHTML;
    });
});

enterBtn.addEventListener('click', () => result(liveNum, historyNum, operand));

function addNumber(input) {
    liveNum = liveNum + input;
    liveInput.innerHTML = liveNum;
    return liveNum;
};

function deleteNumber() {
    const del = liveNum.slice(0, -1);
    liveInput.innerHTML = del;
    liveNum = del
    return liveNum;
}

function clearNumber() {
    liveNum = "";
    historyNum = "";
    liveInput.innerHTML = liveNum;
    historyInput.innerHTML = historyNum
    return liveNum;
}

function moveHistory(liveNum) {
    historyNum = liveNum;
    historyInput.innerHTML = historyNum;
    return historyNum;
}

function result(liveNum, historyNum, operand) {
    let res = 0;
    switch(operand) {
        case "+":
            res = parseFloat(liveNum) + parseFloat(historyNum);
            break;
        case "-":
            res = parseFloat(liveNum) - parseFloat(historyNum);
            break;
        case "*":
            res = parseFloat(liveNum) * parseFloat(historyNum);
            break;
        case "/":
            res = parseFloat(liveNum) / parseFloat(historyNum);
            break;
        default:
            res = "Incorrect value";
            break;
    }
    clearNumber();
    liveInput.innerHTML = res;
    return res;
}
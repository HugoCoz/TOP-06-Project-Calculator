let liveNum = "";

const live = document.querySelector('.live');
const numberBtn = document.querySelectorAll('div.inputs > div.number');
const deleteBtn = document.querySelector('div.delete');
const clearBtn = document.querySelector('div.clear');

numberBtn.forEach((e) => {
    e.addEventListener('click', () => {
        addNumber(parseInt(e.innerHTML));
    });
});

deleteBtn.addEventListener('click', () => deleteNumber());
clearBtn.addEventListener('click', () => clearNumber());

function addNumber(input) {
    liveNum = liveNum + input;
    live.innerHTML = liveNum;
    return liveNum;
};

function deleteNumber() {
    const del = liveNum.slice(0, -1);
    live.innerHTML = del;
    liveNum = del
    return liveNum;
}

function clearNumber() {
    liveNum = "";
    live.innerHTML = liveNum;
    return liveNum;
}
'use strict';
 
const getBank = () => JSON.parse(localStorage.getItem ('toDoList')) ?? [];
const setBank = (bank) => localStorage.setItem('toDoList', JSON.stringify(bank))

const createItem = (task, status, index) => {
    const item = document.createElement('item');
    item.classList.add('toDoItem');
    item.innerHTML = `
    <input type="checkbox" ${status} data-index=${index}>
    <div>${task}</div>
    <input type="button" value="X"></input data-index=${index}>
    `;
    document.getElementById('toDoList').appendChild(item);
}

const cleanScreen = () => {
    const toDoList = document.getElementById('toDoList');
    while (toDoList.firstChild){
        toDoList.removeChild(toDoList.lastChild);
    }
}

const refreshScreen = () => {
    cleanScreen();
    const bank = getBank();
    bank.forEach((item, index)=> createItem (item.task, item.status, index));
}

const addTask = (event) => {
    const tecla = event.key;
    const text = event.target.value;
    if(tecla === 'Enter'){
        const bank = getBank();
        bank.push({'task': text, 'status': ''});
        setBank(bank);
    refreshScreen();
    event.target.value = '';
    }
}
const removeItem = (index) => {
    const bank = getBank();
    bank.splice(index, 1);
    setBank(bank);
    refreshScreen();
}

const refreshItem = (index) => {
    const bank = getBank();
    bank[index].status = bank[index].status === '' ? 'checked' : '';
    setBank(bank);
    refreshScreen();
}

const clickItem = (e) => {
    const element = e.target;
    if (element.type === 'button') {
        const index = element.dataset.index; 
        removeItem(index);
    }else if (element.type === 'checkbox'){
        const index = element.dataset.index;
        refreshItem(index);
    }
}

document.getElementById('newItem').addEventListener('keypress', addTask);
document.getElementById('toDoList').addEventListener('click', clickItem);

refreshScreen();

const main = document.getElementById('mainbox');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateBtn = document.getElementById('calculate-wealth');

let data = [];


//fetch random users and money


getRandomUsers();
getRandomUsers();
getRandomUsers();

async function getRandomUsers(){
    const res = await fetch('https://randomuser.me/api/')
    const data = await res.json();
    const user = data.results[0]

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() *1000000)
    }       
    addData(newUser);
}

function addData(obj){
    data.push(obj);
    updateDOM();
}

function updateDOM(providedData = data){
    main.innerHTML= "<h2><strong>Person</strong> Welth</h2>";

    providedData.forEach( item =>{
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong> ${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);

    });
}

function formatMoney(number){
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function doubleMoney(){
    data = data.map(elem => {
        return {...elem, money: elem.money*2};
    })
    updateDOM();
}

function sortThem(){
    data = data.sort((a,b)=> b.money - a.money)
    updateDOM();
}

function showThem(){
    data = data.filter(e => e.money>1000000);
    updateDOM();
}

function calculateTotalFortune(){
    const fortune = data.reduce((acc, numb)=> (acc += numb.money), 0);

    const fortuneResult = document.createElement('div');
    fortuneResult.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(fortune)}</strong></h3>`;
    main.appendChild(fortuneResult);
}

addUserBtn.addEventListener('click', getRandomUsers);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortThem);
showMillionairesBtn.addEventListener('click', showThem);
calculateBtn.addEventListener('click', calculateTotalFortune);
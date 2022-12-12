let currentNames = {
    first: '',
    second: ''
}
let currentGames = 1;
let currentSuit = '';
let currentResult = [0,0];
let allOptions = [];
let allGames = [];
const allPages = document.querySelectorAll('.page');


const allNavigate = document.querySelectorAll('[data-navigate]');

for (const element of allNavigate) {
    element.addEventListener('click', () => {
        console.log('navigate');
        changePage(element.dataset.navigate);
    })
}


const allNumbers = document.querySelectorAll('[data-number]');
const gameWrapper = document.querySelector('.game-wrapper');
for (const num of allNumbers) {
    num.addEventListener('click', () => {
        currentGames = Number(num.dataset.number);
        changePage('4');
        setGames(currentGames);
    })
}


const name1 = document.querySelector('.name1');
const name2 = document.querySelector('.name2');

const nameInput1 = document.querySelector('input[name="first"]');
const nameInput2 = document.querySelector('input[name="second"]');

const changePage = (id) => {
    for (const page of allPages) {
        page.classList.remove('is-active');
        if (page.dataset.page === id) {
            page.classList.add('is-active');
        }
        if (id === '3') {
            currentNames.first = nameInput1.value;
            currentNames.second = nameInput2.value;
        }

        if (id === '4') {
            name1.innerHTML = currentNames.first
            name2.innerHTML = currentNames.second
        }
    }
}

const setGames = (num) => {
    for (let i = 0; i < currentGames; i++) {
        const game = document.createElement('div'),
            option1 = document.createElement('button'),
            option2 = document.createElement('button');
        game.classList.add('game');
        option1.classList.add('option','option1');
        option2.classList.add('option','option2');
        game.append(option1,option2);
        gameWrapper.append(game);
        allGames.push(game);
        allOptions.push(option1);
        allOptions.push(option2);
    }
    gameEvents();
}

const firstResult = document.querySelector('.first-result');
const secondResult = document.querySelector('.second-result');

const gameEvents = () => {
    for (const option of allOptions) {
        option.addEventListener('click', () => {
            if (option.classList.contains('is-checked')) {
                option.classList.remove('is-checked');
            } else {
                const closestGame = option.closest('.game');
                for (let i = 0; i < allGames.indexOf(closestGame) + 1; i++) {
                    if (option.classList.contains('option1')) {
                        allGames[i].querySelector('.option1').classList.add('is-checked');
                    } else {
                        allGames[i].querySelector('.option2').classList.add('is-checked');
                    }
                    
                }
            }
            firstResult.innerHTML = document.querySelectorAll('.option1.is-checked').length;
            secondResult.innerHTML = document.querySelectorAll('.option2.is-checked').length;

        });
    }
}


const typeSelector = document.querySelector('.type-selector');
const typeWrapper = document.querySelector('.type-wrapper');

typeSelector.addEventListener('click', () => {
    typeWrapper.classList.add('is-open');
});

const allTypes = typeWrapper.querySelectorAll('.all-types button');

for (const type of allTypes) {
    type.addEventListener('click', () => {
        typeSelector.querySelector('img').src = type.querySelector('img').src;
        typeWrapper.classList.remove('is-open');
    });
}

const menuButton = document.querySelector('.menu-button');
const menuWrapper = document.querySelector('.menu-wrapper');

menuButton.addEventListener('click', ({target}) => {
    menuWrapper.classList.toggle('is-open');
    target.classList.toggle('is-open');
})
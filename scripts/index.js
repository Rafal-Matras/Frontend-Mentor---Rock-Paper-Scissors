const logo = document.querySelector('[data-logo]');
const score = document.querySelector('[data-score]');
const buttons = document.querySelectorAll('[data-btn]');
const primary = document.querySelector('[data-primary]');
const extended = document.querySelector('[data-extend]');
const circles = document.querySelectorAll('[data-circle]');
const rules = document.querySelector('[data-rules]');
const rulesImage = document.querySelector('[data-rules-image]');
const closeRules = document.querySelector('[data-close]');
const game = document.querySelector('[data-game]');
const viewYourChoice = document.querySelector('[data-your-choice]');
const viewComputerChoice = document.querySelector('[data-computer-choice]');
const viewResults = document.querySelector('[data-result]');
const winLose = document.querySelector('[data-win-lose]');
const again = document.querySelector('[data-play-again]');

if (!window.localStorage.getItem('scores')) {
    const scores = {
        primary: 0,
        extended: 0,
    };
    window.localStorage.setItem('scores', JSON.stringify(scores));
}

let activeGame = 'primary';
let scores;
let yourChoice;
let computerChoice;
let result;

const refreshScore = () => {
    scores = JSON.parse(window.localStorage.getItem('scores'));
    score.textContent = activeGame === 'primary' ? scores.primary : scores.extended;
};

const resetClass = () => {
    viewResults.classList.remove('active');
    game.classList.remove('active');
    viewYourChoice.innerHTML = '';
    viewComputerChoice.innerHTML = '';
};

const resetScore = () => {
    activeGame === 'primary' ? scores.primary = 0 : scores.extended = 0;
    window.localStorage.setItem('scores', JSON.stringify(scores));
    refreshScore();
};

//  Buttons

const changeLevel = () => {
    resetClass();
    activeGame = activeGame === 'primary' ? 'extended' : 'primary';
    if (activeGame === 'primary') {
        logo.setAttribute('src', 'images/logo.svg');
        score.textContent = scores.primary;
        primary.classList.add('active');
        extended.classList.remove('active');
        buttons.forEach(btn => {
            if (btn.dataset.btn === 'level') {
                btn.textContent = 'extended';
            }
        });
    } else {
        logo.setAttribute('src', 'images/logo-bonus.svg');
        score.textContent = scores.extended;
        primary.classList.remove('active');
        extended.classList.add('active');
        buttons.forEach(btn => {
            if (btn.dataset.btn === 'level') {
                btn.textContent = 'primary';
            }
        });
    }
};

const showRules = () => {
    if (activeGame === 'primary') {
        rulesImage.setAttribute('src', './images/image-rules.svg');
    } else rulesImage.setAttribute('src', './images/image-rules-bonus.svg');
    rules.classList.add('active');
};

closeRules.addEventListener('click', () => rules.classList.remove('active'));

buttons.forEach(btn => {
    if (btn.dataset.btn === 'reset') {
        btn.addEventListener('click', resetScore);
    }
    if (btn.dataset.btn === 'level') {
        btn.addEventListener('click', changeLevel);
    }
    if (btn.dataset.btn === 'rules') {
        btn.addEventListener('click', showRules);
    }
});

//  start game, clicked item

const drawComputerChoice = () => {
    const max = activeGame === 'primary' ? 3 : 5;
    const number = Math.floor(Math.random() * max + 1);
    switch (number) {
        case 1:
            return 'paper';
            break;
        case 2:
            return 'rock';
            break;
        case 3:
            return 'scissors';
            break;
        case 4:
            return 'lizard';
            break;
        case 5:
            return 'spock';
    }
};

const showYourChoice = () => {
    viewYourChoice.innerHTML = `
        <div class="circle circle-${yourChoice}" data-your>
          <div class="icon-button">
            <img class="icon" src="./images/icon-${yourChoice}.svg" alt="icon">
          </div>
        </div>`;
};

const showComputerChoice = () => {
    viewComputerChoice.innerHTML = `
        <div class="circle circle-${computerChoice}" data-computer>
          <div class="icon-button">
            <img class="icon" src="./images/icon-${computerChoice}.svg" alt="icon">
          </div>
        </div>`;
};

const whoWin = () => {
    if (yourChoice === computerChoice) {
        return 0;
    }
    if (yourChoice === 'paper' && (computerChoice === 'rock' || computerChoice === 'spock')) {
        return 1;
    }
    if (yourChoice === 'rock' && (computerChoice === 'scissors' || computerChoice === 'lizard')) {
        return 1;
    }
    if (yourChoice === 'scissors' && (computerChoice === 'paper' || computerChoice === 'lizard')) {
        return 1;
    }
    if (yourChoice === 'lizard' && (computerChoice === 'paper' || computerChoice === 'spock')) {
        return 1;
    }
    if (yourChoice === 'spock' && (computerChoice === 'rock' || computerChoice === 'scissors')) {
        return 1;
    }
    return -1;
};

const addToScore = () => {
    activeGame === 'primary' ? scores.primary += result : scores.extended += result;
    window.localStorage.setItem('scores', JSON.stringify(scores));
    refreshScore();
};

const showResults = () => {
    if (result !== 0) {
        winLose.textContent = result === 1 ? 'you win' : 'you lost';
    } else winLose.textContent = 'draw';
    viewResults.classList.add('active');
    addToScore();
    if (result === 0) return;
    again.style.color = result === 1 ? 'black' : 'red';
    const win = result === 1 ? 'your' : 'computer';
    const addShadow = document.querySelector(`[data-${win}]`);
    addShadow.classList.add('shadow');
};

const startGame = (selected) => {
    buttons.forEach(btn => btn.disabled = true);
    game.classList.add('active');
    primary.classList.remove('active');
    extended.classList.remove('active');
    yourChoice = selected;
    computerChoice = drawComputerChoice();
    result = whoWin();
    showYourChoice();
    setTimeout(() => showComputerChoice(), 1000);
    setTimeout(() => showResults(), 2000);
    setTimeout(() => {
        buttons.forEach(btn => btn.disabled = false);
    }, 2000);
};

circles.forEach(circle => {
    circle.addEventListener('click', () => startGame(circle.dataset.circle));
});

// play again

const playAgain = () => {
    resetClass();
    activeGame === 'primary'
        ? primary.classList.add('active')
        : extended.classList.add('active');
};

again.addEventListener('click', playAgain);

refreshScore();


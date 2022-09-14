const logo = document.querySelector('[data-logo]');
const score = document.querySelector('[data-score]');
const buttons = document.querySelectorAll('[data-btn]');
const primary = document.querySelector('[data-primary]');
const extended = document.querySelector('[data-extend]');
const circle = document.querySelectorAll('[data-circle]');
const rules = document.querySelector('[data-rules]');
const rulesImage = document.querySelector('[data-rules-image]');
const closeRules = document.querySelector('[data-close]');

if (!window.localStorage.getItem('scores')) {
    const scores = {
        primary: 0,
        extended: 0,
    };
    window.localStorage.setItem('scores', JSON.stringify(scores));
}

let activeGame = 'primary';
let scores;

const refreshScore = () => {
    scores = JSON.parse(window.localStorage.getItem('scores'));
    score.textContent = activeGame === 'primary' ? scores.primary : scores.extended;
};

const resetScore = () => {
    if (activeGame === 'primary') {
        scores.primary = 0;
    }
    if (activeGame === 'extended') {
        scores.extended = 0;
    }
    window.localStorage.setItem('scores', JSON.stringify(scores));
    refreshScore();
};

const changeLevel = () => {
    activeGame = activeGame === 'primary' ? 'extended' : 'primary';
    if (activeGame === 'primary') {
        logo.setAttribute('src', 'images/logo.svg');
        score.textContent = scores.primary;
        buttons.forEach(btn => {
            if (btn.dataset.btn === 'level') {
                btn.textContent = 'extended';
            }
        });
        primary.classList.add('active');
        extended.classList.remove('active');
    } else {
        logo.setAttribute('src', 'images/logo-bonus.svg');
        score.textContent = scores.extended;
        buttons.forEach(btn => {
            if (btn.dataset.btn === 'level') {
                btn.textContent = 'primary';
            }
        });
        primary.classList.remove('active');
        extended.classList.add('active');
    }
};

const showRules = () => {
    if (activeGame === 'primary') {
        rulesImage.setAttribute('src', './images/image-rules.svg');
    } else {
        rulesImage.setAttribute('src', './images/image-rules-bonus.svg');
    }
    rules.classList.add('active');
};


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

closeRules.addEventListener('click', () => rules.classList.remove('active'));

refreshScore();


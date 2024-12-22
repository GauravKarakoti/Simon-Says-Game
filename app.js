let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "grey", "purple", "red"];
let soundMap = {
    red: new Audio("sounds/red.mp3"),
    yellow: new Audio("sounds/yellow.mp3"),
    grey: new Audio("sounds/grey.mp3"),
    purple: new Audio("sounds/purple.mp3"),
};

let started = false;
let level = 0;
let highscore = localStorage.getItem("highscore") || 0;

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");

document.addEventListener("keypress", startGame);

function startGame() {
    if (!started) {
        h2.innerText = "Level 1";
        h3.innerText = `Highest Score = ${highscore}`;
        started = true;
        levelUp();
    }
}

function levelUp() {
    userSeq = [];
    level++;
    highscore = Math.max(level, highscore);
    localStorage.setItem("highscore", highscore);
    h2.innerText = `Level ${level}`;

    let i = 0;
    const interval = setInterval(() => {
        const btn = document.querySelector(`.${gameSeq[i]}`);
        btnFlash(btn);
        i++;
        if (i >= gameSeq.length) {
            clearInterval(interval);
        }
    }, 600);

    const randIdx = Math.floor(Math.random() * btns.length);
    const randColor = btns[randIdx];
    gameSeq.push(randColor);
}

function btnFlash(btn) {
    btn.classList.add("flashBtn");
    soundMap[btn.id].play();
    setTimeout(() => {
        btn.classList.remove("flashBtn");
    }, 500);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function btnPress() {
    let btn = this;     
    userFlash(btn);
    
    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function() {
        btn.classList.remove("userFlash");
    }, 500);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        gameOver();
    }
}

function gameOver() {
    h2.innerHTML = `Game Over! Your score was <b>${level}</b>.<br>Press any key to start.`;
    h3.innerHTML = `Highest Score = ${highscore}`;
    document.body.style.backgroundColor = "red";
    setTimeout(() => {
        document.body.style.backgroundColor = "white";
    }, 500);
    reset();
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
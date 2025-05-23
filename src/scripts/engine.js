const hitSound = new Audio("./src/audios/hit.m4a");

let playerScore = 0;
let playerLives = 3;
let time = 30;
let currentPosition = null;
let enemyTimerId;
let gameTimerId;

const squares = document.querySelectorAll(".square");
const timeLeft = document.querySelector(".menu-time h2:nth-child(2)");
const score = document.querySelector(".menu-score h2:nth-child(2)");
const livesText = document.querySelector(".menu-lives h2");

function randomSquare() {
    squares.forEach(square => {
        square.classList.remove("enemy"); //Limpa todos
    });

    const randomIndex = Math.floor(Math.random() * squares.length); //escolhe um número de 0 a 8
    const randomSquare = squares[randomIndex];
    randomSquare.classList.add("enemy"); //bota o Ralph ali

    currentPosition = randomSquare.id; //guarda onde ele tá
}

squares.forEach(square => {
    square.addEventListener("click", () => {
        if (square.id === currentPosition) {
            hitSound.play();
            playerScore++;
            score.textContent = playerScore;
            currentPosition = null;
        } else {
            playerLives--;
            livesText.textContent = "x" + playerLives;
            if (playerLives === 0) {
                endGame("Você perdeu todas as vidas!");
            }
        }
    });
});

function countDown() {
    time--;
    timeLeft.textContent = time;
    if (time === 0) {
        endGame("Tempo esgotado!");
    }
}

function endGame(message) {
    clearInterval(enemyTimerId);
    clearInterval(gameTimerId);

    const gameOverScreen = document.getElementById("game-over");
    const finalScore = document.getElementById("final-score");

    finalScore.textContent = `${message} Sua pontuação foi: ${playerScore}`;
    gameOverScreen.style.display = "flex";
}

function startGame() {
    enemyTimerId = setInterval(randomSquare, 800);
    gameTimerId = setInterval(countDown, 1000);
}

startGame();

function restartGame() {
    window.location.reload();
}
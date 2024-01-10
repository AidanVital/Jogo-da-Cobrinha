const gameContainer = document.querySelector('.game-container');
const snake = document.querySelector('.snake');
const food = document.querySelector('.food');

let snakeX = 0;
let snakeY = 0;
let foodX = 0;
let foodY = 0;
let score = 0;
let tail = [];
let tailElements = [];

const gridSize = 20;
const gridSizePx = 300;
const initialSpeed = 200;
let speed = initialSpeed;
let direction = 'right';
let gameInterval;

function randomizeFoodPosition() {
    foodX = Math.floor(Math.random() * (gridSizePx / gridSize)) * gridSize;
    foodY = Math.floor(Math.random() * (gridSizePx / gridSize)) * gridSize;
    food.style.left = foodX + 'px';
    food.style.top = foodY + 'px';
}

function updateTail() {
    for (let i = 0; i < tail.length; i++) {
        if (!tailElements[i]) {
            tailElements[i] = document.createElement('div');
            tailElements[i].className = 'tail';
            gameContainer.appendChild(tailElements[i]);
        }
        tailElements[i].style.left = tail[i].x + 'px';
        tailElements[i].style.top = tail[i].y + 'px';
    }
    while (tailElements.length > tail.length) {
        gameContainer.removeChild(tailElements.pop());
    }
}

function moveSnake() {
    let newSnakeX = snakeX;
    let newSnakeY = snakeY;

    switch (direction) {
        case 'up':
            newSnakeY -= gridSize;
            break;
        case 'down':
            newSnakeY += gridSize;
            break;
        case 'left':
            newSnakeX -= gridSize;
            break;
        case 'right':
            newSnakeX += gridSize;
            break;
    }

    if (newSnakeX < 0 || newSnakeX >= gridSizePx || newSnakeY < 0 || newSnakeY >= gridSizePx) {
        gameOver();
        return;
    }

    if (newSnakeX === foodX && newSnakeY === foodY) {
        score++;
        tail.unshift({ x: snakeX, y: snakeY });
        randomizeFoodPosition();
        increaseSpeed();
    } else if (tail.length > 0) {
        tail.pop();
        tail.unshift({ x: snakeX, y: snakeY });
    }

    snakeX = newSnakeX;
    snakeY = newSnakeY;
    snake.style.left = snakeX + 'px';
    snake.style.top = snakeY + 'px';

    updateTail();

    for (let i = 0; i < tail.length; i++) {
        if (snakeX === tail[i].x && snakeY === tail[i].y) {
            gameOver();
            return;
        }
    }
}

function increaseSpeed() {
    clearInterval(gameInterval);
    speed -= 10;
    gameInterval = setInterval(moveSnake, speed);
}

function gameOver() {
    clearInterval(gameInterval);
    alert('Voce Perdeu! Pontuação: ' + score);
    location.reload();
}

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            if (direction !== 'down') {
                direction = 'up';
            }
            break;
        case 'ArrowDown':
            if (direction !== 'up') {
                direction = 'down';
            }
            break;
        case 'ArrowLeft':
            if (direction !== 'right') {
                direction = 'left';
            }
            break;
        case 'ArrowRight':
            if (direction !== 'left') {
                direction = 'right';
            }
            break;
    }
});

randomizeFoodPosition();
gameInterval = setInterval(moveSnake, speed);

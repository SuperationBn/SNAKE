// SuperationBn
// llamamos al boton de reset y al contador de puntos;
const btnReset = document.getElementById('reset');
const showResulScore = document.getElementById('showResul');
const showTotalScore = document.getElementById('totalScore');
const displayOver = document.getElementById('boxGameOver');
// ------------------------------------------------
// llemamos a el elemento canvas y lo transformamos a 2D;
const canvas = document.getElementById('canvasBox');
const ctx = canvas.getContext('2d');

const gameWidth = canvas.width;
const gameHeight = canvas.height;
// ------------------------------------------------
// creamos variables de estilos para la snake y el fondo del canvas;
// const boardBackground = '#e8e3d8';
let boardBackground;
const foodColor = '#dd1717';
const snakeColor = '#17dd35';
const snakeBorder = '#1d1f1d';
// ------------------------------------------------
// creamos variable de acciones de la skane "!IMPORTANTES";
const unitSize = 20;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
  { x: unitSize * 4, y: 0 },
  { x: unitSize * 3, y: 0 },
  { x: unitSize * 2, y: 0 },
  { x: unitSize, y: 0 },
  { x: 0, y: 0 }
]
// ------------------------------------------------

// theme box
const btnTheme = document.getElementById('themeColor');
boardBackground = '#e8e3d8';
btnTheme.addEventListener('click', () => {
  if (boardBackground === '#e8e3d8') {
    boardBackground = '#191717';
  } else if (boardBackground === '#191717') {
    boardBackground = '#e8e3d8';
  }
})

// ------------------------------------------------

window.addEventListener('keydown', chanheDirection);
btnReset.addEventListener('click', resetGame);

// creamos 11 funciones de determinaran la accion del juego;
// ------------------------------------------------
// 3°
gameStart();
function gameStart() {
  running = true;
  showResulScore.innerHTML = `score: ${score}`;
  createFood();
  drawFood();
  nextTick();

  if (running) {
    displayOver.style.display = 'none';
  }
};
// ------------------------------------------------
// 4°
function nextTick() {
  if (running) {
    setTimeout(() => {
      clearBoard();
      drawFood();
      moveSnake();
      drawSnake()
      checkGameOver();
      nextTick();
    }, 75);
  } else {
    displayGameOver();
  }
};
// ------------------------------------------------
// 5°
function clearBoard() {
  ctx.fillStyle = boardBackground;
  ctx.fillRect(0, 0, gameWidth, gameHeight);
};
// ------------------------------------------------
// 1°
function createFood() {
  function createRandounFood(min, max) {
    const numR = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
    return numR;
  }
  foodX = createRandounFood(0, gameWidth - unitSize);
  foodY = createRandounFood(0, gameWidth - unitSize);
};
// ------------------------------------------------
// 2°
function drawFood() {
  ctx.fillStyle = foodColor;
  ctx.fillRect(foodX, foodY, unitSize, unitSize);
};
// ------------------------------------------------
// 7°
function moveSnake() {
  const head = {
    x: snake[0].x + xVelocity,
    y: snake[0].y + yVelocity
  }
  snake.unshift(head);

  if (snake[0].x === foodX && snake[0].y === foodY) {
    score += 1;
    showResulScore.innerHTML = `score: ${score}`;
    createFood();
  } else {
    snake.pop()
  }
};
// ------------------------------------------------
// 6°
function drawSnake() {
  ctx.fillStyle = snakeColor;
  ctx.strokeStyle = snakeBorder;
  snake.forEach(snakePart => {
    ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
    ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
  })
};
// ------------------------------------------------
// 8°
function chanheDirection(event) {
  const keyPreesed = event.keyCode;

  const up = 38;
  const left = 37;
  const down = 40;
  const rigth = 39;

  const goinUp = (yVelocity == - unitSize);
  const goinLeft = (xVelocity == - unitSize);
  const goinDown = (yVelocity == unitSize);
  const goinRigth = (xVelocity == unitSize);

  switch (true) {
    case (keyPreesed === up && !goinDown):
      yVelocity = - unitSize;
      xVelocity = 0;
      break;
    case (keyPreesed === left && !goinRigth):
      xVelocity = - unitSize;
      yVelocity = 0;
      break;
    case (keyPreesed === down && !goinUp):
      yVelocity = unitSize;
      xVelocity = 0;
      break;
    case (keyPreesed === rigth && !goinLeft):
      xVelocity = unitSize;
      yVelocity = 0;
      break;
  }
};
// ------------------------------------------------
// 9°
function checkGameOver() {
  switch (true) {
    case (snake[0].x < 0):
      running = false;
      break
    case (snake[0].x >= gameWidth):
      running = false;
      break
    case (snake[0].y < 0):
      running = false;
      break
    case (snake[0].y >= gameHeight):
      running = false;
      break
  }

  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      running = false;
    }
  }
};
// ------------------------------------------------
// 10°
function displayGameOver() {
  running = false
  if (running === false) {
    showTotalScore.innerHTML = ' ' + score;
    displayOver.style.display = 'block';
  }
};
// ------------------------------------------------
// 11°
function resetGame() {
  displayOver.style.display = 'none';
  score = 0;
  showResulScore.innerHTML = score;
  xVelocity = unitSize;
  yVelocity = 0;
  snake = [
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 },
    { x: 0, y: 0 }
  ]
  gameStart();
};
// ------------------------------------------------
//SuperationBn
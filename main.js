const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
let score = 0;
let lives = 3;
let gameOver = false;
let gameWon = false;

// Ball properties
const ball = {
  x: canvas.width / 2,
  y: canvas.height - 30,
  dx: 4,
  dy: -4,
  radius: 10,
};

// Paddle properties
const paddle = {
  x: (canvas.width - 150) / 2,
  y: canvas.height - 20,
  width: 150,
  height: 10,
};

// Brick properties
const brick = {
  rowCount: 5,
  columnCount: 9,
  width: 75,
  height: 20,
  padding: 10,
  offsetTop: 40,
  offsetLeft: 30,
};

// Create bricks
let bricks = [];
for (let c = 0; c < brick.columnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brick.rowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

// --- DRAWING FUNCTIONS ---

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = '#fff';
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for (let c = 0; c < brick.columnCount; c++) {
    for (let r = 0; r < brick.rowCount; r++) {
      if (bricks[c][r].status === 1) {
        const brickX = c * (brick.width + brick.padding) + brick.offsetLeft;
        const brickY = r * (brick.height + brick.padding) + brick.offsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brick.width, brick.height);
        ctx.fillStyle = '#0095DD';
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function drawScore() {
    ctx.font = '20px Arial';
    ctx.fillStyle = '#fff';
    ctx.fillText('Score: ' + score, 8, 28);
}

function drawLives() {
    ctx.font = '20px Arial';
    ctx.fillStyle = '#fff';
    ctx.fillText('Lives: ' + lives, canvas.width - 75, 28);
}


// --- COLLISION DETECTION ---

function collisionDetection() {
  // Brick collision
  for (let c = 0; c < brick.columnCount; c++) {
    for (let r = 0; r < brick.rowCount; r++) {
      const b = bricks[c][r];
      if (b.status === 1) {
        if (
          ball.x > b.x &&
          ball.x < b.x + brick.width &&
          ball.y > b.y &&
          ball.y < b.y + brick.height
        ) {
          ball.dy = -ball.dy;
          b.status = 0;
          score++;
          if (score === brick.rowCount * brick.columnCount) {
              gameWon = true;
          }
        }
      }
    }
  }

  // Wall collision (left/right)
  if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
    ball.dx = -ball.dx;
  }

  // Wall collision (top)
  if (ball.y + ball.dy < ball.radius) {
    ball.dy = -ball.dy;
  } 
  
  // Wall collision (bottom) -> Game Over
  else if (ball.y + ball.dy > canvas.height - ball.radius) {
    // Paddle collision
    if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
      ball.dy = -ball.dy;
    } else {
      lives--;
      if (!lives) {
          gameOver = true;
      } else {
          // Reset ball and paddle
          ball.x = canvas.width / 2;
          ball.y = canvas.height - 30;
          ball.dx = 4;
          ball.dy = -4;
          paddle.x = (canvas.width - paddle.width) / 2;
      }
    }
  }
}

// --- GAME LOOP ---

function update() {
    if (gameOver) {
        ctx.font = '48px Arial';
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
        ctx.font = '24px Arial';
        ctx.fillText('Click to Restart', canvas.width / 2, canvas.height / 2 + 40);
        return;
    }
    if (gameWon) {
        ctx.font = '48px Arial';
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.fillText('YOU WIN!', canvas.width / 2, canvas.height / 2);
        ctx.font = '24px Arial';
        ctx.fillText('Click to Restart', canvas.width / 2, canvas.height / 2 + 40);
        return;
    }

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw objects
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();

  // Update logic
  collisionDetection();

  // Move ball
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Request next frame
  requestAnimationFrame(update);
}

// --- EVENT LISTENERS ---

document.addEventListener('mousemove', (e) => {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddle.x = relativeX - paddle.width / 2;
  }
});

document.addEventListener('click', () => {
    if(gameOver || gameWon) {
        document.location.reload();
    }
});


// Start the game
update();
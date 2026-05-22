(function() {
  const canvas = document.getElementById('pong');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  
  let ballX = width / 2;
  let ballY = height / 2;
  let ballSpeedX = 4;
  let ballSpeedY = 3;
  let ballSize = 8;
  
  let paddle1Y = height / 2 - 20;
  let paddle2Y = height / 2 - 20;
  const paddleHeight = 40;
  const paddleWidth = 8;
  const paddleSpeed = 5;

  function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  }

  function drawCircle(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
    ctx.fill();
  }

  function update() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY - ballSize < 0 || ballY + ballSize > height) {
      ballSpeedY = -ballSpeedY;
    }

    let p1Center = paddle1Y + paddleHeight / 2;
    if (p1Center < ballY - 5) {
      paddle1Y += paddleSpeed;
    } else if (p1Center > ballY + 5) {
      paddle1Y -= paddleSpeed;
    }

    let p2Center = paddle2Y + paddleHeight / 2;
    if (p2Center < ballY - 5) {
      paddle2Y += paddleSpeed;
    } else if (p2Center > ballY + 5) {
      paddle2Y -= paddleSpeed;
    }

    if (ballX - ballSize < paddleWidth && ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
      ballSpeedX = -ballSpeedX;
      ballX = paddleWidth + ballSize; 
      let collidePoint = ballY - (paddle1Y + paddleHeight / 2);
      ballSpeedY = collidePoint * 0.2;
    }

    if (ballX + ballSize > width - paddleWidth && ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
      ballSpeedX = -ballSpeedX;
      ballX = width - paddleWidth - ballSize;
      let collidePoint = ballY - (paddle2Y + paddleHeight / 2);
      ballSpeedY = collidePoint * 0.2;
    }

    if (ballX < 0 || ballX > width) {
      ballX = width / 2;
      ballY = height / 2;
      ballSpeedX = -ballSpeedX;
      ballSpeedY = 3 * (Math.random() > 0.5 ? 1 : -1);
    }

    if (paddle1Y < 0) paddle1Y = 0;
    if (paddle1Y + paddleHeight > height) paddle1Y = height - paddleHeight;
    if (paddle2Y < 0) paddle2Y = 0;
    if (paddle2Y + paddleHeight > height) paddle2Y = height - paddleHeight;
  }

  function draw() {
    drawRect(0, 0, width, height, '#000');

    for (let i = 0; i < height; i += 15) {
      drawRect(width / 2 - 1, i, 2, 10, '#0f0');
    }

    drawRect(0, paddle1Y, paddleWidth, paddleHeight, '#0f0');
    drawRect(width - paddleWidth, paddle2Y, paddleWidth, paddleHeight, '#0f0');

    drawCircle(ballX, ballY, ballSize, '#0f0');
  }

  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }
      
  loop();
})();

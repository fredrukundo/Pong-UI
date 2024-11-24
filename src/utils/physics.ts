export class Ball {
    pos: { x: number; y: number };
    velocity: { x: number; y: number };
    radius: number;
  
    constructor(x: number, y: number, vx: number, vy: number, radius: number) {
      this.pos = { x, y };
      this.velocity = { x: vx, y: vy };
      this.radius = radius;
    }
  
    update(canvasWidth: number, canvasHeight: number) {
      this.pos.x += this.velocity.x;
      this.pos.y += this.velocity.y;
  
      // Bounce off top and bottom edges
      if (this.pos.y - this.radius <= 0 || this.pos.y + this.radius >= canvasHeight) {
        this.velocity.y *= -1.1;
      }

      // cap the speed to prevent excessive difficulty
      const maxSpeed = 12;
      this.velocity.x = Math.min(maxSpeed, Math.max(this.velocity.x, -maxSpeed));
      this.velocity.y = Math.min(maxSpeed, Math.max(this.velocity.y, -maxSpeed));
    }
  
    draw(ctx: CanvasRenderingContext2D) {
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  
    respawn(canvasWidth: number, canvasHeight: number, direction: 'left' | 'right') {
      this.pos = {
        x: direction === 'left' ? 150 : canvasWidth - 150,
        y: Math.random() * (canvasHeight - 200) + 100,
      };
      this.velocity.x *= -1;
      this.velocity.y *= -1;
    }
  }
  
  export class Paddle {
    pos: { x: number; y: number };
    velocity: number;
    width: number;
    height: number;
  
    constructor(x: number, y: number, velocity: number, width: number, height: number) {
      this.pos = { x, y };
      this.velocity = velocity;
      this.width = width;
      this.height = height;
    }
  
    update(keysPressed: Record<string, boolean>, canvasHeight: number, score: number) {
      const adjustedVelocity = this.velocity + score * 0.8; // Increase speed slightly
      if (keysPressed['ArrowUp']) {
        this.pos.y = Math.max(0, this.pos.y - adjustedVelocity);
      }
      if (keysPressed['ArrowDown']) {
        this.pos.y = Math.min(canvasHeight - this.height, this.pos.y + adjustedVelocity);
      }
    }
  
    // updateAI(ball: Ball, canvasHeight: number, reactionTime: number = 5) {
    //   if (ball.velocity.x > 0) {
    //     if (ball.pos.y > this.pos.y + this.height / 2) {
    //       this.pos.y = Math.min(canvasHeight - this.height, this.pos.y + this.velocity);
    //     } else {
    //       this.pos.y = Math.max(0, this.pos.y - this.velocity);
    //     }
    //   }
    // }
    updateAI(ball: Ball, canvasHeight: number, reactionTime: number = 5) {
      // Add a delay for AI reaction
      if ( ball.velocity.x > 0 && Math.random() < reactionTime / 7) {
        if (ball.pos.y > this.pos.y + this.height / 2) {
          this.pos.y = Math.min(canvasHeight - this.height, this.pos.y + this.velocity);
        } else {
          this.pos.y = Math.max(0, this.pos.y - this.velocity);
        }
      }
    }
    
  
    draw(ctx: CanvasRenderingContext2D) {
      ctx.fillStyle = '#fff';
      ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }
  }
  
  export function checkCollisions(ball: Ball, paddle1: Paddle, paddle2: Paddle) {
    // Check collision with paddles
    const collidesWithPaddle = (paddle: Paddle) => {
      const dx = Math.abs(ball.pos.x - (paddle.pos.x + paddle.width / 2));
      const dy = Math.abs(ball.pos.y - (paddle.pos.y + paddle.height / 2));
      return (
        dx < ball.radius + paddle.width / 2 &&
        dy < ball.radius + paddle.height / 2
      );
    };
  
    // if (collidesWithPaddle(paddle1) || collidesWithPaddle(paddle2)) {
    //   ball.velocity.x *= -1.1;
    //   ball.velocity.y *= 1.1;
    // }
    if (collidesWithPaddle(paddle1) || collidesWithPaddle(paddle2)) {
      const paddle = collidesWithPaddle(paddle1) ? paddle1 : paddle2;
      const impactPoint = (ball.pos.y - paddle.pos.y) / paddle.height; // -1 (top) to 1 (bottom)
      ball.velocity.x *= -1; // Reverse direction
      ball.velocity.y += impactPoint * 2; // Add spin based on impact
    }
  }
  
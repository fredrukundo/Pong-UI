'use client'

import { useEffect, useRef, useState } from 'react';
import Scoreboard from './Scoreboard';
import { Ball, Paddle, checkCollisions } from '@/utils/physics';

function drawGamePlayground(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Set styles for the playground elements
  ctx.strokeStyle = "#fff"; // Green color for the playground
  ctx.lineWidth = 2;

  // Draw the centerline
  const centerX = canvas.width / 2;
  ctx.setLineDash([10, 15]); // Dashed line
  ctx.beginPath();
  ctx.moveTo(centerX, 0);
  ctx.lineTo(centerX, canvas.height);
  ctx.stroke();

  // Draw the center circle
  const centerY = canvas.height / 2;
  ctx.setLineDash([]); // Remove dashes for the circle
  ctx.beginPath();
  ctx.arc(centerX, centerY, 30, 0, Math.PI * 2); // Circle with radius 50
  ctx.stroke();
}


const Game = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    canvas.width = 1024;
    canvas.height = 480;

    const paddleWidth = 10;
    const paddleHeight = 120;

    const player1 = new Paddle(0, 50, 15, paddleWidth, paddleHeight);
    const player2 = new Paddle(canvas.width - paddleWidth, 30, 15, paddleWidth, paddleHeight);
    const ball = new Ball(200, 200, 10, 10, 20);

    const keysPressed: Record<string, boolean> = {};

    const handleKeyDown = (e: KeyboardEvent) => (keysPressed[e.key] = true);
    const handleKeyUp = (e: KeyboardEvent) => (keysPressed[e.key] = false);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawGamePlayground(ctx, canvas);

      // Update
      player1.update(keysPressed, canvas.height);
      player2.updateAI(ball, canvas.height);
      ball.update(canvas.width, canvas.height);

      // Check collisions
      checkCollisions(ball, player1, player2);

      // Score handling
      if (ball.pos.x <= -ball.radius) {
        setPlayer2Score((score) => score + 1);
        ball.respawn(canvas.width, canvas.height, 'right');
      }
      if (ball.pos.x >= canvas.width + ball.radius) {
        setPlayer1Score((score) => score + 1);
        ball.respawn(canvas.width, canvas.height, 'left');
      }

      // Draw
      player1.draw(ctx);
      player2.draw(ctx);
      ball.draw(ctx);

      requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div className="relative bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-20">
      <div>
        <Scoreboard player1Score={player1Score} player2Score={player2Score} />
      </div>
      <canvas id="gameCanvas" ref={canvasRef} className="bg-[#023a5e] border-4 border-[#074e7a34]"></canvas>
    </div>
  );
};

export default Game;

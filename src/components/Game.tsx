'use client';

import { useEffect, useRef, useState } from 'react';
import Scoreboard from './Scoreboard';
import { Ball, Paddle, checkCollisions } from '@/utils/physics';

const user1 = {
  avatar: '/me.jpeg',
};

const user2 = {
  avatar: '/bot.jpg',
};

function drawGamePlayground(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#fff"; // White for playground elements
  ctx.lineWidth = 2;

  // Draw the center dashed line
  const centerX = canvas.width / 2;
  ctx.setLineDash([10, 15]); // Dashed line
  ctx.beginPath();
  ctx.moveTo(centerX, 0);
  ctx.lineTo(centerX, canvas.height);
  ctx.stroke();

  // Draw the center circle
  const centerY = canvas.height / 2;
  ctx.setLineDash([]); // Solid line for the circle
  ctx.beginPath();
  ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
  ctx.stroke();
}

const Game = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [winner, setWinner] = useState<string | null>(null); // Track the winner
  const [countdown, setCountdown] = useState<number | null>(3); // Countdown timer
  const animationFrameId = useRef<number | null>(null); // Track animation frame ID

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth * 0.7;
    canvas.height = window.innerHeight * 0.4;

    const paddleWidth = canvas.width * 0.01;
    const paddleHeight = canvas.height * 0.2;

    const player1 = new Paddle(0, 50, 15, paddleWidth, paddleHeight);
    const player2 = new Paddle(canvas.width - paddleWidth, 30, 15, paddleWidth, paddleHeight);
    const ball = new Ball(canvas.width / 2, canvas.height / 2, 10, 10, 20);

    const keysPressed: Record<string, boolean> = {};

    const handleKeyDown = (e: KeyboardEvent) => (keysPressed[e.key] = true);
    const handleKeyUp = (e: KeyboardEvent) => (keysPressed[e.key] = false);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const startGame = () => {
      const gameLoop = () => {
        if (winner) return; // Stop the game loop if there is a winner

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGamePlayground(ctx, canvas);

        // Update game elements
        player1.update(keysPressed, canvas.height, player1Score);
        player2.updateAI(ball, canvas.height);
        ball.update(canvas.width, canvas.height);

        // Check collisions
        checkCollisions(ball, player1, player2);

        // Handle scoring
        if (ball.pos.x <= -ball.radius) {
          setPlayer2Score((score) => score + 1);
          ball.respawn(canvas.width, canvas.height, 'right');
        }
        if (ball.pos.x >= canvas.width + ball.radius) {
          setPlayer1Score((score) => score + 1);
          ball.respawn(canvas.width, canvas.height, 'left');
        }

        // Check for a winner
        if (player1Score >= 3 || player2Score >= 3) {
          setWinner(player1Score >= 3 ? 'Player 1' : 'Player 2');
          return;
        }

        // Draw game elements
        player1.draw(ctx);
        player2.draw(ctx);
        ball.draw(ctx);

        animationFrameId.current = requestAnimationFrame(gameLoop);
      };

      animationFrameId.current = requestAnimationFrame(gameLoop);
    };

    // Handle countdown before starting the game
    if (countdown !== null) {
      const timer = setInterval(() => {
        setCountdown((prev) => (prev! > 1 ? prev! - 1 : null));
      }, 1000);

      return () => clearInterval(timer);
    } else {
      startGame();
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [countdown, player1Score, player2Score, winner]);

  const handleRestart = () => {
    setPlayer1Score(0);
    setPlayer2Score(0);
    setWinner(null);
    setCountdown(3); // Restart countdown
  };

  return (
    <div className="relative bg-[#022c22] border border-gray-700 rounded-lg shadow-lg p-6 aspect-w-16 aspect-h-9">
      {/* Countdown Overlay */}
      {countdown !== null && (
        <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center text-white text-6xl font-bold">
          {countdown === 0 ? 'Go!' : countdown}
        </div>
      )}

      {/* Game Over Overlay */}
      {winner && (
        <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl font-bold mb-4">{winner} Wins!</h1>
          <button
            onClick={handleRestart}
            className="px-6 py-3 text-sm md:text-base lg:text-lg bg-green-500 text-white font-bold rounded-lg hover:bg-green-900"
          >
            Restart Game
          </button>
        </div>
      )}

      {/* Scoreboard */}
      <Scoreboard
        player1Score={player1Score}
        player2Score={player2Score}
        player1Avator={user1.avatar}
        player2Avator={user2.avatar}
      />

      {/* Canvas */}
      <div className="w-full sm:max-w-2xl md:max-w-3xl lg:max-w-5xl aspect-w-16 aspect-h-9">
        <canvas ref={canvasRef} className="w-full h-full bg-[#064e3b] border-4 border-[#074e7a34]"></canvas>
      </div>
    </div>
  );
};

export default Game;

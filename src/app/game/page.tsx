'use client'
import { useEffect, useRef } from "react";

export default function HomeGame() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect( () => {
        const canvas = canvasRef.current!;
        const context = canvas.getContext("2d");
        const paddleHeight = 75;
        const paddleWidth = 10;
        const ballRadius = 10;

        


    }, []);
    return (
        <div>
            <h1>Welcome to the Game Page</h1>
            <main className="flex justify-center items-center h-screen">
            <canvas
                ref={canvasRef}
                className="border-4 border-white"
                width={800}
                height={400}
                >

            </canvas>
            </main>
        </div>
    );
}
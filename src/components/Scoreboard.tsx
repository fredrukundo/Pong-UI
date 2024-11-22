interface ScoreboardProps {
  player1Score: number;
  player2Score: number;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ player1Score, player2Score }) => {
  return (
    <div className="flex justify-between items-center text-white mb-6">
      <div className="text-center">
        <h2 className="text-4xl font-bold">Player 1</h2>
        <span className="text-3xl font-bold">{player1Score}</span>
      </div>
      <div className="text-center">
        <h2 className="text-4xl font-bold">Player 2</h2>
        <span className="text-3xl font-bold">{player2Score}</span>
      </div>
    </div>
  );
};

export default Scoreboard;

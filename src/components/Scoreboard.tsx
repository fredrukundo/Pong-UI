interface ScoreboardProps {
    player1Score: number;
    player2Score: number;
  }
  
  const Scoreboard: React.FC<ScoreboardProps> = ({ player1Score, player2Score }) => {
    return (
      <div className="absolute w-full top-10 flex justify-between px-40 text-5xl font-bold">
        <div id="player1Score">{player1Score}</div>
        <div id="player2Score">{player2Score}</div>
      </div>
    );
  };
  
  export default Scoreboard;
  
function PlayerCard({ player }) {
  return (
    <div className="lobby-player">

      <span className="player-number">
        {player.id}
      </span>

      <span className="player-name">
        {player.name}
      </span>

      <span className="player-status">
        {player.status}
      </span>

    </div>
  );
}

export default PlayerCard;
import PlayerCard from "./PlayerCard";

function PlayerLobby({ players }) {
  return (
    <div className="player-grid">

      {players.map((player) => (
        <PlayerCard
          key={player.id}
          player={player}
        />
      ))}

    </div>
  );
}

export default PlayerLobby;
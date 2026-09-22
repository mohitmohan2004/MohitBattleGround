import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";
import PlayerLobby from "../components/PlayerLobby";
import "./BattleLobby.css";

const API_URL = "http://localhost:8080";

function BattleLobby() {
  const navigate = useNavigate();

  const [players, setPlayers] = useState([]);
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadLobby();
  }, []);

  async function loadLobby() {
    try {
      const playersResponse = await axios.get(
        `${API_URL}/api/players`
      );

      const matchesResponse = await axios.get(
        `${API_URL}/api/matches`
      );

      setPlayers(playersResponse.data);

      if (matchesResponse.data.length > 0) {
        setMatch(matchesResponse.data[0]);
        setMessage("");
      } else {
        setMessage("No match available.");
      }

    } catch (error) {
      console.error("Backend error:", error);

      setMessage(
        "Backend connect nahi ho raha. Demo lobby start ho gayi hai."
      );

      const demoPlayers = Array.from(
        { length: 51 },
        (_, index) => ({
          id: index + 1,
          name: `Player_${String(index + 1).padStart(2, "0")}`,
          status: index < 45 ? "READY" : "WAITING",
        })
      );

      setPlayers(demoPlayers);

      setMatch({
        matchId: 1,
        matchName: "Mohit Battle Royale",
        status: "WAITING",
      });
    } finally {
      setLoading(false);
    }
  }

  async function joinMatch() {
    if (!match) {
      setMessage("No match available.");
      return;
    }

    // Demo mode
    if (
      match.matchId === 1 &&
      match.status === "WAITING"
    ) {
      setMessage(
        "Demo match joined! Entering battlefield..."
      );

      setTimeout(() => {
        navigate("/battlefield");
      }, 800);

      return;
    }

    // Real backend match
    try {
      const response = await axios.post(
        `${API_URL}/api/matches/${match.matchId}/join?playerId=1`
      );

      setMatch(response.data);

      setMessage(
        "Successfully joined the match!"
      );

      setTimeout(() => {
        navigate("/battlefield");
      }, 1000);

    } catch (error) {
      console.error("Join match error:", error);

      setMessage(
        error.response?.data ||
        "Unable to join match."
      );
    }
  }

  if (loading) {
    return (
      <div className="loading-screen">
        LOADING BATTLE LOBBY...
      </div>
    );
  }

  return (
    <div className="battle-lobby-page">

      <Navbar />

      <div className="lobby-title">
        <h1>BATTLE LOBBY</h1>

        {match && (
          <p>{match.matchName}</p>
        )}
      </div>

      {message && (
        <div className="lobby-message">
          {message}
        </div>
      )}

      <PlayerLobby players={players} />

      <div className="lobby-actions">

        <button
          className="join-button"
          onClick={joinMatch}
          disabled={match?.status === "FULL"}
        >
          {match?.status === "FULL"
            ? "MATCH FULL"
            : "JOIN MATCH"}
        </button>

        <button
          className="back-button"
          onClick={() => navigate("/")}
        >
          BACK
        </button>

      </div>

    </div>
  );
}

export default BattleLobby;
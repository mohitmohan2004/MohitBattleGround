import { useNavigate } from "react-router-dom";
import "./MainMenu.css";

function MainMenu() {
  const navigate = useNavigate();

  return (
    <div className="main-menu">

      <div className="menu-overlay">

        {/* =========================
            GAME HEADER
        ========================= */}
        <header className="game-header">

          <h1>
            MOHIT BATTLEGROUND
          </h1>

          <p>
            ONLINE MULTIPLAYER COMBAT
          </p>

        </header>


        {/* =========================
            MAIN MENU
        ========================= */}
        <main className="menu-content">

          <h2>
            WELCOME SOLDIER
          </h2>


          {/* PLAY */}
          <button
            className="play-button"
            onClick={() =>
              navigate("/battle-lobby")
            }
          >
            PLAY BATTLE
          </button>


          {/* LOGIN */}
          <button
            className="secondary-button"
            onClick={() =>
              navigate("/login")
            }
          >
            LOGIN
          </button>


          {/* REGISTER */}
          <button
            className="secondary-button"
            onClick={() =>
              navigate("/register")
            }
          >
            REGISTER
          </button>

        </main>


        {/* =========================
            SERVER INFORMATION
        ========================= */}
        <footer>

          <span>
            🟢 SERVER: ONLINE
          </span>

          <span>
            👥 MAX PLAYERS: 51
          </span>

        </footer>

      </div>

    </div>
  );
}

export default MainMenu;
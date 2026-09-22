import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleRegister(event) {
    event.preventDefault();

    if (!username || !password) {
      alert("Username and password required.");
      return;
    }

    localStorage.setItem(
      "mohitBattleGroundUser",
      username
    );

    alert("Registration successful!");

    navigate("/");
  }

  return (
    <div className="auth-page">

      <div className="auth-box">

        <h1>CREATE PLAYER</h1>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="Player Name"
            value={username}
            onChange={(event) =>
              setUsername(event.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
          />

          <button type="submit">
            REGISTER
          </button>

        </form>

        <p>
          Already registered?{" "}
          <Link to="/login">
            LOGIN
          </Link>
        </p>

        <Link to="/">
          BACK TO MAIN MENU
        </Link>

      </div>

    </div>
  );
}

export default Register;
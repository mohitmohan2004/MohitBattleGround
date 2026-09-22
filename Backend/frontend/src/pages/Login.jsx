import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(event) {
    event.preventDefault();

    if (!username || !password) {
      alert("Username and password required.");
      return;
    }

    const registeredUsername = localStorage.getItem(
      "mohitBattleGroundUser"
    );

    if (!registeredUsername) {
      alert("No account found. Please register first.");
      navigate("/register");
      return;
    }

    if (username !== registeredUsername) {
      alert("Username not found.");
      return;
    }

    localStorage.setItem(
      "mohitBattleGroundLoggedIn",
      "true"
    );

    localStorage.setItem(
      "mohitBattleGroundUser",
      username
    );

    alert("Login successful!");

    navigate("/battle-lobby");
  }

  return (
    <div className="auth-page">
      <div className="auth-box">

        <h1>PLAYER LOGIN</h1>

        <form onSubmit={handleLogin}>

          <input
            type="text"
            placeholder="Username"
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
            LOGIN
          </button>

        </form>

        <p>
          New player?{" "}
          <Link to="/register">
            CREATE ACCOUNT
          </Link>
        </p>

        <Link to="/">
          BACK TO MAIN MENU
        </Link>

      </div>
    </div>
  );
}

export default Login;
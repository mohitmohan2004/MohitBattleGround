import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        MOHIT<span>BATTLEGROUND</span>
      </div>

      <div className="nav-links">

        <Link to="/">
          HOME
        </Link>

        <Link to="/battle-lobby">
          BATTLE LOBBY
        </Link>

        <Link to="/battlefield">
          BATTLEFIELD
        </Link>

        <Link to="/login">
          LOGIN
        </Link>

        <Link to="/register">
          REGISTER
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;
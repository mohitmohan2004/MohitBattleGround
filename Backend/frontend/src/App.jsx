import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainMenu from "./pages/MainMenu";
import BattleLobby from "./pages/BattleLobby";
import Battlefield from "./pages/Battlefield";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/battle-lobby" element={<BattleLobby />} />
        <Route path="/battlefield" element={<Battlefield />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { LeftBar } from "./component/LeftBar";
import { Home } from "./pages/Home";
import { Search } from "./pages/Search";
import { Login } from "./component/Login";
import Signup from "./component/Signup";
import { AuthProvider } from "./contexts";
import { CreatePlaylist } from "./pages/CreatePlaylist";

function App() {
  return (
    <BrowserRouter>
      {/* <AuthProvider> */}
      <div className="container">
        <LeftBar />
        <div className="header">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/Playlist/:id" element={<CreatePlaylist />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
          </Routes>
        </div>
      </div>
      {/* </AuthProvider> */}
    </BrowserRouter>
  );
}

export default App;

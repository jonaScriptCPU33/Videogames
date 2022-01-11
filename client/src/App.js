import "./App.css";
import { Routes, Route } from "react-router-dom";

/* Components */
import LandingPage from "./Components/LandingPage/LandingPage";
import Home from "./Components/Home/Home";
import VideoGameCreate from "./Components/VideoGameCreate/VideoGameCreate"
import Details from "./Components/Details/Details";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/videogame" element={<VideoGameCreate />}/>
        <Route exact path="/details/:id" element={<Details/>} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;

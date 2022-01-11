import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="principal">
      <div className="container">
        <h1>Bienvenido A VideoGames</h1>
        <Link to="/home">
          <button className="btn">Sigueme</button>
        </Link>
      </div>
      <div className="wave">
      
      </div>
    </div>
  );
}

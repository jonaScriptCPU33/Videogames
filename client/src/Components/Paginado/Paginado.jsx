import React from "react";
import "./Paginado.css";

export default function Paginado({ gamesPerPage, allGames, paginado }) {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(allGames / gamesPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <nav>
      <ul className="paginado">
        {pageNumber &&
          pageNumber.map((number) => (
            <button
              className="number"
              key={number}
              onClick={() => paginado(number)}
            >
              {number}
            </button>
          ))}
      </ul>
    </nav>
  );
}

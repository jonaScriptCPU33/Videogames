import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

export default function Card({ name, id, background_image, genres, rating }) {
  return (
    <div className="Container-tarjetas">
      <div className="tarjetas">
        <Link to={`/details/${id}`}>
          <h3>{name}</h3>
          <h4>{rating}</h4>
          <img
            src={background_image}
            alt="img not found"
            width="200px"
            height="250px"
          />

          {genres?.map((el) => {
            return typeof el === "string" ? <h6>{el}</h6> : <h6>{el.name}</h6>;
          })}
        </Link>
      </div>
    </div>
  );
}

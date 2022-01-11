import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../Redux/Actions/ActionsIndex";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Details.css";

export default function Detail() {
  const dispatch = useDispatch();
  const myVideoGame = useSelector((state) => state.detail);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  console.log("MI VIDEO GAME", myVideoGame);

  return (
    <div className="container-Principal">
      {myVideoGame ? (
        <div className="card-grande">
          <h1 className="textos">{myVideoGame.name}</h1>
          <img
            src={myVideoGame.background_image}
            alt=""
            width="500px"
            height="700px"
          />
          <h2>Description:</h2>
          <p> {myVideoGame.description}</p>
          <h3>Released: {myVideoGame.released}</h3>
          <h2>Stores:</h2>
          {myVideoGame.stores?.map((el) => {
            if (typeof el === "string") {
              return <h2 key={el}>{el}</h2>;
            }
            return <h4>{el.name}</h4>;
          })}

          <h2>Platforms:</h2>
          {myVideoGame.platforms?.map((el) => {
            if (typeof el === "string") {
              return <h4 key={el}>{el}</h4>;
            }
            return <h4>{el.platform.name}</h4>;
          })}
          <h2>Rating:</h2>
          <h4>{myVideoGame.rating}</h4>
                   
          <h2>Genres:</h2>
          {myVideoGame.genres?.map((el) => (
            <>
              <p>{el.name}</p>
            </>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Link to="/home">
        <button>Volver</button>
      </Link>
    </div>
  );
}

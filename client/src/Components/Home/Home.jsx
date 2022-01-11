import React from "react";
import "./Home.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideogames,
  sortVideogames,
  filterCreated,
  filterGamesByRating,
  getGenres,
  genresFilter,
} from "../../Redux/Actions/ActionsIndex";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/Searchbar";

export default function Home() {
  const dispatch = useDispatch();
  const allGames = useSelector((state) => state.videogames);
  const genres = useSelector((state) => state.genres);

  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [gamesPerPage] = useState(15);

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexFirstGames = indexOfLastGame - gamesPerPage;

  const currentGames = allGames.slice(indexFirstGames, indexOfLastGame);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getGenres());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getVideogames());
  }

  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
  }

  function handleOrder(e) {
    e.preventDefault();
    dispatch(sortVideogames(e.target.value));
    setCurrentPage(1);
    setOrder(sortVideogames(e.target.value));
  }

  function handleRating(e) {
    e.preventDefault();
    if (e.target.value === "mejor" || e.target.value === "peor") {
      dispatch(filterGamesByRating(e.target.value));
    } else {
      dispatch(filterGamesByRating(e.target.value));
    }
  }

  function handleGenres(e) {
    dispatch(genresFilter(e.target.value));
  }

  return (
    <div className="container">
      <SearchBar />
      <Link to="/">
        <h1>VideoGames</h1>
      </Link>
      <Link to="/videogame">
        <div className="div-Crear">
          <h4 className="createVD">Crear Video Juego</h4>
        </div>
      </Link>
      <button
        className="btn-crgVD"
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Volver a cargar los videogames
      </button>
      <div className="container-selectors">
        <select onChange={(e) => handleOrder(e)} className="selectors">
          <option value="Asc">Ascendente</option>
          <option value="Desc">Descendente</option>
        </select>
        <select onChange={(e) => handleRating(e)} className="selectors">
          <option value="mejor">Mejor Rating</option>
          <option value="peor">Peor Rating</option>
        </select>
        <select onChange={(e) => handleFilterCreated(e)} className="selectors">
          <option value="All">Todos</option>
          <option value="created">Creados</option>
          <option value="api">De la Api</option>
        </select>

        <select onChange={(e) => handleGenres(e)} className="selectors">
          <option value="All"> Todos los Generos</option>
          {genres &&
            genres?.map((genre) => {
              return (
                <option value={genre.name}>
                  {genre.name}
                </option>
              );
            })}
        </select>

        <Paginado
          gamesPerPage={gamesPerPage}
          allGames={allGames.length}
          paginado={paginado}
        />
        <div className="tarjetas">
          {currentGames.length ? (
            currentGames === "No encontrado" ? (
              <h3>Este vídeo juego no existe</h3>
            ) : (
              currentGames?.map((el) => {
                return (
                  <div>
                    <Link to={"/home/" + el.id} key={el.id}>
                      <Card
                        name={el.name}
                        background_image={el.background_image}
                        genres={el.genres}
                        rating={el.rating}
                        key={el.id}
                        id={el.id}
                      />
                    </Link>
                  </div>
                );
              })
            )
          ) : (
            <h2>Cargando...</h2>
          )}
        </div>
      </div>
    </div>
  );
}

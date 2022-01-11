import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  postGame,
  getGenres,
  platforms,
} from "../../Redux/Actions/ActionsIndex";
import { useDispatch, useSelector } from "react-redux";
import "./VideogameCreate.css";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Se requiere un nombre";
  }
  if (!input.rating) {
    errors.rating = "Si no pones rating no podrás continuar";
  }
  if (!input.description) {
    errors.description = " Por favor inserta una descripción de tu juego";
  }
  if (!input.released) {
    errors.released = "Debes ingresar una fecha";
  }

  return errors;
}

export default function VideoGameCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const genres = useSelector((state) => state.genres);
  const platformsRedux = useSelector((state) => state.platforms);

  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    genres: [],
    rating: "",
    platforms: [],
    released: "",
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    console.log(input);

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    console.log(input);
  }

  function handleSelect(e) {
    setInput({
      ...input,
      genres: [...input.genres, e.target.value],
    });
  }

  function handlePlatforms(e) {
    setInput({
      ...input,
      platforms: [...input.platforms, e.target.value],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(postGame(input));
    alert("Video Juego Creado");
    setInput({
      name: "",
      genres: [],
      rating: "",
      platforms: [],
      released: "",
      description: "",
    });
    navigate("/home");
  }

  function handleDelete(el) {
    setInput({
      ...input,
      genres: input.genres.filter((gen) => gen !== el),
    });
  }

  function handleDeletePlatforms(el) {
    setInput({
      ...input,
      platforms: input.platforms.filter((plat) => plat !== el),
    });
  }

  useEffect(() => {
    dispatch(getGenres());
    dispatch(platforms());
  }, [dispatch]);

  return (
    <div className="container-div">
      <h1>Crea tu Video Juego</h1>
      <Link to="/home">
        <button className="btn-Volver">Volver</button>
      </Link>

      <form onSubmit={(e) => handleSubmit(e)} className="formulario">
        <div>
          <input
            className="dataForm"
            type="text"
            name="name"
            placeholder="Nombre"
            value={input.name}
            onChange={(e) => handleChange(e)}
            required
          />
          {errors.name && <p className="errors">{errors.name} </p>}
        </div>
        <div>
          <input
            class="dataForm"
            type="decimal"
            placeholder="Rating"
            name="rating"
            value={input.rating}
            onChange={(e) => handleChange(e)}
            required
          />
          {errors.rating && <p className="errors">{errors.rating} </p>}
        </div>
        <div>
          <input
            className="dataForm"
            type="text"
            name="description"
            placeholder="Description"
            value={input.description}
            onChange={(e) => handleChange(e)}
            required
          />
          {errors.description && (
            <p className="errors">{errors.description} </p>
          )}
        </div>
        <div className="div-release">
          <input
            id="dataForm"
            type="date"
            name="released"
            placeholder="Released"
            value={input.released}
            onChange={(e) => handleChange(e)}
            required
          />
          {errors.released && <p className="errors">{errors.released} </p>}
        </div>

        <div className="div-genero">
          <label className="genero">Generos</label>
        </div>

        <select
          onChange={(e) => handleSelect(e)}
          className="selectors"
          required
        >
          {genres?.map((gen) => (
            <option value={gen.name}>{gen.name}</option>
          ))}
        </select>

        <div>
          <label>Plataformas</label>
        </div>
        <select onChange={(e) => handlePlatforms(e)}>
          {platformsRedux?.map((plat) => (
            <option value={plat}>{plat}</option>
          ))}
        </select>

        <div className="create">
          <button type="submit" className="crear">
            Crear Video Juego
          </button>
        </div>
      </form>
      {input.genres.map((el) => {
        return (
          <div className="divGen">
            <p>{el}</p>
            <button className="buttonX" onClick={() => handleDelete(el)}>
              X
            </button>
          </div>
        );
      })}
      {input.platforms.map((el) => {
        return (
          <div className="divPlat">
            <button
              className="buttonXPlat"
              onClick={() => handleDeletePlatforms(el)}
            >
              X
            </button>
            <p>{el}</p>
          </div>
        );
      })}
    </div>
  );
}

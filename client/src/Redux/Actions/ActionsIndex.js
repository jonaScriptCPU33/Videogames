/* Aquí recibo la data que proviene de el backend */
import {
  GET_VIDEOGAMES,
  SORT_VIDEOGAMES,
  GET_GENRES,
  GET_NAME_VIDEOGAMES,
  FILTER_BY_RATINGS,
  GENRES_FILTER,
  FILTER_CREATED,
  GET_DETAILS,
  GET_PLATFORMS,
} from "../Constantes/ActionTypes";
import axios from "axios";

export const getVideogames = () => {
  return async function (dispatch) {
    var info = await axios.get("http://localhost:3001/videogames");
    return dispatch({
      type: GET_VIDEOGAMES,
      payload: info.data,
    });
  };
};
/* ---------------------------------------------------------------------*/
export const sortVideogames = (payload) => {
  return {
    type: SORT_VIDEOGAMES,
    payload,
  };
};

/* ---------------------------------------------------------------------*/
export const getNameVideoGames = (name) => {
  return async function (dispatch) {
    try {
      var json = await axios("http://localhost:3001/videogames?name=" + name);
      return dispatch({
        type: GET_NAME_VIDEOGAMES,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
      return dispatch({
        type: GET_NAME_VIDEOGAMES,
        payload: "No encontrado",
      });
    }
  };
};

/* -------------------------Genres------------------- */

export const getGenres = () => {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/genres");
    return dispatch({
      type: GET_GENRES,
      payload: json.data,
    });
  };
};
/* ---------------------------------------------------------------------*/
export function genresFilter(payload) {
  return {
    type: GENRES_FILTER,
    payload,
  };
}
/* -------------------------------------------------- */

export function filterGamesByRating(payload) {
  return {
    type: FILTER_BY_RATINGS,
    payload,
  };
}
/* ---------------------------------------------------------------------*/
export function filterCreated(payload) {
  return {
    type: FILTER_CREATED,
    payload,
  };
}
/* ---------------------------------------------------------------------*/
/* export function getDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/videogames/" + id);
      console.log(json.data);
      return dispatch({
        type: GET_DETAILS,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
} */

export function getDetail(id) {
  return async function (dispatch) {    
      return axios.get("http://localhost:3001/videogames/" + id)
      .then(response => 
        dispatch({
          type:GET_DETAILS,
          payload: response.data
        }))
        .catch((error)=>{
          alert(error)
        } )
      } 
  };


/* ---------------------------------------------------------------------*/
export function postGame(payload) {
  return async function () {
    const response = await axios.post(
      "http://localhost:3001/videogame",
      payload
    );
    console.log(response);
    return response;
  };
}
/* ---------------------------------------------------------------------*/
export function platforms() {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/platforms");
    return dispatch({
      type: GET_PLATFORMS,
      payload: response.data,
    });
  };
}
/* ---------------------------------------------------------------------*/

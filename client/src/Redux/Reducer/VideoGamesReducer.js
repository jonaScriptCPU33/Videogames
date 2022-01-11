const initialState = {
  videogames: [],
  allGames: [],
  detail: [],
  genres: [],
  platforms: [],
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
        allGames: action.payload,
      };
    case "GET_NAME_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
      };

    case "GET_ID_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
      };
    /* ---------------------------------------------------------------------*/
    case "GET_PLATFORMS":
      return {
        ...state,
        platforms: action.payload,
      };
    /* ---------------------------------------------------------------------*/
    case "GET_GENRES":
      return {
        ...state,
        genres: action.payload,
      };
    /* ---------------------------------------------------------------------*/
    case "FILTER_CREATED":
      const allVideoGames = state.allGames;
      const createdFilter =
        action.payload === "created"
          ? allVideoGames.filter((el) => el.createdInDb)
          : allVideoGames.filter((el) => !el.createdInDb);
      return {
        ...state,
        videogames: action.payload === "All" ? state.allGames : createdFilter,
      };

    /* ---------------------------------------------------------------------*/
    case "GENRES_FILTER":
      const genreFilter =
        action.payload === "All"
          ? state.allGames
          : state.allGames.filter((e) => {
              for (let i = 0; i < e.genres.length; i++) {
                if (e.genres[i].name === action.payload) {
                  return true;
                }
              }
              return undefined;
            });
      return {
        ...state,
        videogames: genreFilter,
      };
    /* ---------------------------------------------------------------------*/

    case "SORT_VIDEOGAMES":
      let sortVideogames =
        action.payload === "Asc"
          ? [...state.videogames].sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : [...state.videogames].sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videogames: sortVideogames,
      };

    /* ---------------------------------------------------------------------*/

    case "FILTER_BY_RATINGS":
      const ratingsFilter =
        action.payload === "mejor"
          ? [...state.videogames].sort((b, a) => a.rating - b.rating)
          : [...state.videogames].sort((b, a) => b.rating - a.rating);
      return {
        ...state,
        videogames: ratingsFilter,
      };

    /* ---------------------------------------------------------------------*/
    case "GET_DETAILS":
      return {
        ...state,
        detail: action.payload,
      };

    default:
      return state;
  }
};

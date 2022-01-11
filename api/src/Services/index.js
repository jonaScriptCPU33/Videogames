const axios = require("axios");
const { API, API_KEY } = process.env;
const { Genre, Videogame } = require("../db");


/* Traigo data por Id */
async function getIdByName(id) {
  const byDb = await Videogame.findByPk(id, {
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  if (byDb) {
    return byDb;
  } else {
    const byApi = await axios.get(`${API}/${id}?key=${API_KEY}`);

    return byApi.data;
  }
  
}

/* Traigo mas juegos y datos de la API */
async function getDataApi() {
  const apiUrl = await axios.get(`${API}?key=${API_KEY}`);

  try {
    let primeraPagina = [],
      segundaPagina = [],
      terceraPagina = [];
    primeraPagina = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page_size=40`
    );
    let urlNext = primeraPagina.data.next;

    primeraPagina = [...primeraPagina.data.results];

    segundaPagina = await axios.get(urlNext);
    urlNext = segundaPagina.data.next;
    segundaPagina = [...segundaPagina.data.results];

    terceraPagina = await axios.get(urlNext);
    terceraPagina = [...terceraPagina.data.results];
    return [...primeraPagina, ...segundaPagina, ...terceraPagina];
  } catch (error) {
    console.log(error);
  }

  const dataApi = await apiUrl.data.results.map((el) => {
    return {
      id: el.id,
      name: el.name,
      released: el.released,
      rating: el.rating,
      platforms: el.platforms,
      genres: el.genres,
      background_image: el.background_image,
    };
  });

  return dataApi;
}

/* Traigo todos los generos */
async function getDbInfo() {
  return await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
}

/* Unifico data base con API */
async function getAllGames() {
  const apiData = await getDataApi();
  const dbInfo = await getDbInfo();
  const infoTotal = await apiData.concat(dbInfo);
  return infoTotal;
}

module.exports = {
  getAllGames,
  getDataApi,
  getIdByName,
  getDbInfo,
};






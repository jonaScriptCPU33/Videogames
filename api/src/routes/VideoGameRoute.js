const router = require("express").Router();
const { Genre, Videogame } = require("../db");
const { getAllGames, getIdByName } = require("../Services/index");
require("dotenv").config();
const { API_KEY } = process.env;

router.get("/videogames", async (req, res) => {
  const name = req.query.name;
  const gamesTotal = await getAllGames();

  if (name) {
    let videoGamesName = await gamesTotal.filter((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    );

    videoGamesName.length
      ? res.status(200).json(videoGamesName)
      : res.status(404).send([]);
  } else {
    res.status(200).json(gamesTotal);
  }
});

router.get("/videogames/:id", async (req, res) => {
  try {
    const game = await getIdByName(req.params.id);

    let {
      id,
      name,
      released,
      description,
      rating,
      genres,
      platforms,
      background_image,
    } = game;
    res.send({
      id,
      name,
      released,
      description,
      rating,
      genres,
      platforms,
      background_image,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/videogame", async (req, res) => {
  let {
    name,
    released,
    rating,
    platforms,
    description,
    background_image,
    genres,
  } = req.body;

  let [gameCreate, validation] = await Videogame.findOrCreate({
    where: {
      name: name,
    },
    defaults: {
      name,
      released,
      description,
      rating,
      platforms,
      background_image,
    },
  });

  genres?.map(async (el) => {
    let search = await Genre.findAll({
      where: { name: el },
    });
    gameCreate.addGenre(search);
  });

  if (validation) {
    res.send("Juego Creado");
  } else {
    res.send("El juego ya existe");
  }
});

module.exports = router;

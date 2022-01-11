const router = require("express").Router();
const { Videogame } = require("../db");
const axios = require("axios")
require("dotenv").config();
const { API_KEY, API } = process.env;

router.get("/platforms", async (req, res) => {
  const platforms = [];
  const allVidegames = await Videogame.findAll();
  const allDataFromApi = await axios.get(`${API}?key=${API_KEY}`)
  const allData = [...allDataFromApi.data.results, ...allVidegames]

  for (let i = 0; i < allData.length; i++) {
    allData[i].platforms.map((el) => {
      
      if (typeof el === "string") {
        if (!platforms.includes(el)) {
          platforms.push(el);
        }
      } else {
        if (!platforms.includes(el.platform.name)) {
          platforms.push(el.platform.name);
        }
      }
    });
  }
  if (platforms.length) {
    res.status(200).json(platforms);
  } else {
    res.status(404).send("No se encontro la plataforma");
  }
});

module.exports = router;

const router = require("express").Router();
const axios = require("axios");
const { config } = require("dotenv");
const { response } = require("express");
require("dotenv").config();
const { API_KEY } = process.env;
const { Genre } = require("../db");

router.get("/genres", async (req, res) => {
  axios
    .get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    .then((response) => {
      const genresApi = response.data.results.map((gen) => gen.name);
      genresApi.forEach((gen) => {
        Genre.findOrCreate({
          where: { name: gen },
        });
      });
      return Genre.findAll();
    })
    .then((gen) => {
      res.status(200).json(gen);
    })
    .catch((error) => {
      res.status(404).json(error);
    });
});

module.exports = router;

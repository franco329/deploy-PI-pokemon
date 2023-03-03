const { Pokemon, Type } = require("../db");
require("dotenv").config();
const { API_URL } = process.env;
const { Op } = require("sequelize");
const axios = require("axios");
const cleanArray = require("../utils/cleanArray");

const searchNameDb = async (name) => {
  const pokemonDb = await Pokemon.findAll({
    where: { name: { [Op.iLike]: `%${name}%` } },
    include: {
      model: Type,
      attributes: ["name"],
      as: "type",
    },
    attributes: {
      exclude: ["createdAt", "updateAt"],
    },
  });
  const databasePokemons = pokemonDb.map((pokemon) => {
    return {
      ...pokemon.toJSON(),
      type: pokemon.type.map((type) => type.name).join(", "),
    };
  });
  return databasePokemons;
};

const searchNameApi = async (name) => {
  try {
    const pokemonRaw = await axios
      .get(`${API_URL}pokemon/${name}`)
      .then((res) => res.data);
    return await cleanArray([pokemonRaw]);
  } catch (error) {
    return [];
  }
};

module.exports = {
  searchNameApi,
  searchNameDb,
};

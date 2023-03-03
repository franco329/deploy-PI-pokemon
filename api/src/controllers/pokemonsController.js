const { Pokemon, Type } = require("../db");
const axios = require("axios");
const cleanArray = require("../utils/cleanArray");
const { searchNameApi, searchNameDb } = require("../utils/searchName");
const getPokemonPage = require("../utils/pokemonPage");
require("dotenv").config();
const { API_URL } = process.env;

const createPokemon = async (
  name,
  image,
  hp,
  attack,
  defense,
  speed,
  height,
  weight,
  typeOne,
  typeTwo
) => {
  const newPokemon = await Pokemon.create({
    name,
    image,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
  });
  const types = [typeOne, typeTwo].filter(Boolean);
  for (let i = 0; i < types.length; i++) {
    const eachType = await Type.findOne({
      where: { name: types[i] },
    });
    await newPokemon.addType(eachType);
  }
  return newPokemon;
};

const getPokemonById = async (id, source) => {
  let pokemon = [];
  if (source === "api") {
    const res = await axios.get(`${API_URL}pokemon/${id}`);
    pokemon = cleanArray([res.data]);
  } else {
    const res = await Pokemon.findByPk(id, {
      include: {
        model: Type,
        attributes: ["name"],
        as: "type",
      },
      attributes: {
        exclude: ["createdAt", "updateAt"],
      },
    });
    const pokemonFromDb = [res];
    const databasePokemons = pokemonFromDb.map((pokemon) => {
      return {
        ...pokemon.toJSON(),
        type: pokemon.type.map((type) => type.name),
      };
    });
    if (databasePokemons) {
      pokemon = databasePokemons;
    }
  }
  return pokemon;
};

const searchPokemonByName = async (name) => {
  const pokeApi = await searchNameApi(name);
  const pokeDb = await searchNameDb(name);

  if (!pokeApi.length && !pokeDb.length)
    throw new Error(`The pokemon with the name ${name} does not exist.`);

  const pokemonName = [...pokeDb, ...pokeApi];
  return pokemonName;
};

const getAllPokemons = async () => {
  try {
    const database = await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ["name"],
        as: "type",
      },
      attributes: {
        exclude: ["createdAt", "updateAt"],
      },
    });

    const databasePokemons = await database.map((pokemon) => ({
      ...pokemon.toJSON(),
      type: pokemon.type.map((type) => type.name),
    }));
    //==================== Busqueda API ==============================================

    const allApiPokemons = [];
    let url = `${API_URL}pokemon`;

    while (url) {
      const { results, next } = await getPokemonPage(url);
      const apiPokemons = await Promise.all(
        results.map(async (pokemon) => {
          const res = await axios.get(pokemon.url);
          return res.data;
        })
      );

      allApiPokemons.push(...apiPokemons);
      url = next;
    }
    const allDataApi = cleanArray(allApiPokemons);
    return [...databasePokemons, ...allDataApi];
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  createPokemon,
  getPokemonById,
  searchPokemonByName,
  getAllPokemons,
};

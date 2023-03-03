const axios = require("axios");

const getPokemonPage = async (url) => {
  const { data } = await axios.get(url);
  const results = data.results.map((pokemon) => ({
    name: pokemon.name,
    url: pokemon.url,
  }));
  return { results, next: data.next };
};

module.exports = getPokemonPage;

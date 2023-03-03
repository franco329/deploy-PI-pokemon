const { Router } = require("express");
const {
  getPokemonHandler,
  getPokemonsHandler,
  createPokemonHandler,
} = require("../handlers/pokemonsHandlers");

const pokeRouter = Router();

const validate = (req, res, next) => {
  const { name, hp, attack, defense } = req.body;
  if (!name) return res.status(400).json({ error: "Mising name" });
  if (!hp) return res.status(400).json({ error: "Mising hp" });
  if (!attack) return res.status(400).json({ error: "Mising attack" });
  if (!defense) return res.status(400).json({ error: "Mising defense" });

  next();
};

pokeRouter.get("/", getPokemonsHandler);
pokeRouter.get("/:id", getPokemonHandler);
pokeRouter.post("/create", validate, createPokemonHandler);

module.exports = pokeRouter;

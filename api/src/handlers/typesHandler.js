const { getAllTypes } = require("../controllers/typeController");
const { Type } = require("../db");

const getTypesHandler = async (req, res) => {
  try {
    if (!Type.length) {
      const results = await getAllTypes();
      res.status(200).json(results);
    } else {
      await Type.findAll().then((types) => res.send(types));
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getTypesHandler,
};

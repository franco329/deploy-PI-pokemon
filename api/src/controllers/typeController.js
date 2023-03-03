const { Type } = require("../db");
const axios = require("axios");
require("dotenv").config();
const { API_URL } = process.env;

const getAllTypes = async () => {
  const response = await axios.get(`${API_URL}type`);
  const results = await Promise.all(
    response.data.results.map(async (type, index) => {
      const res = {
        id: ++index,
        name: type.name,
      };
      const { name } = res;
      const [typeInstance] = await Type.findOrCreate({ where: { name } });
      return typeInstance.toJSON();
    })
  );
  return results;
};

module.exports = {
  getAllTypes,
};

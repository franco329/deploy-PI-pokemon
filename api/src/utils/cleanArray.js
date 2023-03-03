const cleanArray = (arr) =>
  arr.map((elem) => {
    const stats = elem.stats || [];
    return {
      id: elem.id,
      name: elem.name,
      hp: stats[0]?.base_stat || 0,
      attack: stats[1]?.base_stat || 0,
      defense: stats[2]?.base_stat || 0,
      speed: stats[5]?.base_stat || 0,
      height: elem.height ? elem.height : 0,
      weight: elem.weight ? elem.weight : 0,
      image: elem.sprites?.other?.["official-artwork"]?.["front_default"],
      type: elem.types ? elem.types.map((ele) => ele.type.name) : undefined,
      created: false,
    };
  });

module.exports = cleanArray;

const Sequelize = require("sequelize");
const db = require("../config/banco");

const Produto = db.define("produto", {
  produto: {
    type: Sequelize.STRING,
  },
  marca: {
    type: Sequelize.STRING,
  },
  modelo: {
    type: Sequelize.STRING,
  },
  descricao: {
    type: Sequelize.TEXT,
  },
  palavrasChave: {
    type: Sequelize.TEXT,
  }
})

module.exports = Produto;

// FORMULÁRIO PRODUTOS
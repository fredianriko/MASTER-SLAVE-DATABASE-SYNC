const { Sequelize, DataTypes } = require("sequelize");

const masterConnection = new Sequelize({
  host: "localhost",
  dialect: "mysql",
  port: 3306,
  database: "master-database-test",
  username: "root",
  password: "root",
});

const slaveConnection = new Sequelize({
  host: "localhost",
  dialect: "mysql",
  port: 3306,
  database: "slave-database-test",
  username: "root",
  password: "root",
});

const productMaster = require("./master-table");
const productSlave = require("./slave-table");

// master connection
const product = productMaster(masterConnection, DataTypes);
const productSlaves = productSlave(slaveConnection, DataTypes);

module.exports = { product, productSlaves, masterConnection, slaveConnection };

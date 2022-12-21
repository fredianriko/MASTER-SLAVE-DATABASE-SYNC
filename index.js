const cron = require("node-cron");
const { Sequelize, DataTypes } = require("sequelize");
const productMaster = require("./master-table");
const productSlave = require("./slave-table");

// master connection
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

const product = productMaster(masterConnection, DataTypes);
const productSlaves = productSlave(slaveConnection, DataTypes);

async function checkData() {
  //   query 5 item
  // need modification to query only the newest data created to master, or updated
  // need to turn updatedAt and createdAt to epoch
  // where updatedAt > (date.time.now - 24 hour)
  // where createdAt > (time.now - 24 hour)
  // mean only get the data where it's updated from last 24 hour or created from 24 hour until current time
  const getSample = await product.findAll({
    limit: 2,
  });

  // store query result to new array
  const listProduct = getSample.map((item) => {
    return item.dataValues;
  });

  // bulk update to slave database products
  await productSlaves.bulkCreate(listProduct);

  console.log(listProduct);
}

checkData();

// cron schedule to run the function every 24 hour
// cron.schedule();

// NOTES

// the slave database size must be smaller than the master size, only portion of the master database should be inserted to slave database

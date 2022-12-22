const cron = require("node-cron");
const { product, productSlaves, masterConnection, slaveConnection } = require("./database-connection");

async function checkData() {
  // count slave product for offset
  const slaveProducts = await productSlaves.findAndCountAll();

  //   query 5 item
  // need modification to query only the newest data created to master, or updated
  // need to turn updatedAt and createdAt to epoch
  // where updatedAt > (date.time.now - 24 hour)
  // where createdAt > (time.now - 24 hour)
  // mean only get the data where it's updated from last 24 hour or created from 24 hour until current time
  const getSample = await product.findAll({
    limit: 2,
    offset: slaveProducts.count,
  });
  // // store query result to new array
  const listProduct = getSample.map((item) => {
    return item.dataValues;
  });
  // // bulk update to slave database products
  const slaveUpdate = await productSlaves.bulkCreate(listProduct);
  if (slaveUpdate) {
    console.log(`Slave table updated`);
  }
  // // close master and slave connection
  masterConnection.close();
  slaveConnection.close();

  return;
}

checkData();

// cron schedule to run the function every 24 hour
// cron.schedule();

// NOTES

// the slave database size must be smaller than the master size, only portion of the master database should be inserted to slave database

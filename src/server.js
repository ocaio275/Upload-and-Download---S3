require("dotenv").config();
const db = require("./config/mysql");
const mongoDB = require("./config/mongodb");

class Server {
  constructor() {
    this.init();
  }

  async init() {
    try {
      await db.authenticate().then(() => console.log("Mysql Server Connect"));
      await mongoDB.connect().then(() => console.log("Mongodb Server Connect"));
    } catch (error) {}
  }
}

module.exports = new Server();

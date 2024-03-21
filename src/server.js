require("dotenv").config();
const db = require("./config/mysql");
const mongoDB = require("./config/mongodb");
const app = require("./app");

const { PORT } = process.env;

class Server {
  constructor() {
    this.init();
  }

  async init() {
    try {
      await db.authenticate().then(() => console.log("Mysql Server Connect"));
      await mongoDB.connect().then(() => console.log("Mongodb Server Connect"));

      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    } catch (error) {}
  }
}

module.exports = new Server();

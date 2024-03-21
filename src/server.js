require("dotenv").config();
const db = require("./config/mysql")

class Server {
  constructor() {
    this.init()
  }

  async init() {
    try {
        await db.authenticate().then(() => console.log("Mysql Server Connect"))
    } catch (error) {
        
    }
  }
}

module.exports = new Server();

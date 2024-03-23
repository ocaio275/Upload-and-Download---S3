const express = require("express");
const expressConfig = require("./config/express")
const configRouter = require("./config/routes")

class App {
  constructor() {
    this.app = express();
    this.initConfigExpress();
    this.initConfigRoutes();
  }

  initConfigExpress() {
    expressConfig(this.app)
  }

  async initConfigRoutes() {
    await configRouter(this.app)
  }
}

module.exports = new App().app;
const router = require("express").Router();
const UserRouter = require("../../api/user/user.routes");
const DocumentRouter = require("../../api/document/document.routes")

const { API_VERSION } = process.env;

const Router = async (app) => {
  new UserRouter(router);
  new DocumentRouter(router);
  app.use(API_VERSION, router);
};

module.exports = Router;

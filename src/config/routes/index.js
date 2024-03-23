const router = require("express").Router();
const UserRouter = require("../../api/user/user.routes");
const AuthRouter = require("../../api/auth/auth.routes");
const { API_VERSION } = process.env;

const Router = async (app) => {
  new UserRouter(router);
  new AuthRouter(router);
  app.use(API_VERSION, router);
};

module.exports = Router;

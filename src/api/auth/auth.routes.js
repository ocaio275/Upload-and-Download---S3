const AuthController = require('./auth.controller')

class AuthRouter {
  constructor(router) {
    this.authController = new AuthController()

    router.route("/auth/login").post(...this._login());
    // router.route("/auth/register").post(...this._register());
  }

  _login() {
    return [(...agrs) => this.authController.login(...agrs)];
  }
}

module.exports = AuthRouter;

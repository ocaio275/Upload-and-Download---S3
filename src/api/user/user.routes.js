const UserController = require("./user.controller");
const { authenticateJWT } = require("../../middlewares/authorization")
const { validateUserId } = require("../../middlewares/validateUserId")

class UserRouter {
  constructor(router) {
    this.userController = new UserController();

    router.route("/user/register").post(...this._createUser());
    router.route("/user/update/password/:userId").patch(...this._updatePassword());
    router.route("/user/delete/:userId").delete(...this._deleteUser());
    router.route("/user/login").post(...this._login());
  }

  _createUser() {
    return [(...agrs) => this.userController.createUser(...agrs)];
  }

  _updatePassword() {
    return [
      authenticateJWT(),
      validateUserId(),
      (...agrs) => this.userController.updatePassword(...agrs),
    ];
  }

  _deleteUser() {
    return [
      authenticateJWT(),
      validateUserId(),
      (...agrs) => this.userController.deleteUser(...agrs),
    ];
  }

  _login() {
    return [(...agrs) => this.userController.login(...agrs)];
  }
}

module.exports = UserRouter;

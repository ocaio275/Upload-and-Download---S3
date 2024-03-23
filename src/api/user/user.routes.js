const UserController = require("./user.controller");

class UserRouter {
  constructor(router) {
    this.userController = new UserController();

    router.route("/user/findAll").get(...this._findAllUsers());
    router.route("/user/create").post(...this._createUser());
    router.route("/user/update/password/:id").patch(...this._updatePassword());
    router.route("/user/delete/:id").delete(...this._deleteUser());
  }

  _findAllUsers() {
    return [(...agrs) => this.userController.findAllUsers(...agrs)];
  }

  _createUser() {
    return [(...agrs) => this.userController.createUser(...agrs)];
  }

  _updatePassword() {
    return [(...agrs) => this.userController.updatePassword(...agrs)];
  }

  _deleteUser() {
    return [(...agrs) => this.userController.deleteUser(...agrs)];
  }
}

module.exports = UserRouter;

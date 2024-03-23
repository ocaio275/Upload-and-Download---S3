const UserService = require("./user.service");
const { isEmpty } = require("lodash");
const ERROR_MESSAGE  = require("../../utils/error-message")

class UserController {
  constructor() {
    this.userService = new UserService();
  }
  async findAllUsers(req, res) {
    try {
      const users = await this.userService.findAllUsers();
      return res.status(200).json({ payload: users });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  async createUser(req, res) {
    const { email, password, confirmPassword } = req.body;

    try {
      if (isEmpty(email)) throw new Error(ERROR_MESSAGE.USER.EMAIL_EMPTY);
      if (isEmpty(password)) throw new Error(ERROR_MESSAGE.USER.PASSWORD_EMPTY);
      if (isEmpty(confirmPassword))
        throw new Error(ERROR_MESSAGE.USER.CONFIRM_PASSWORD_EMPTY);

      await this.userService.createUser({ email, password, confirmPassword });

      return res.status(201).json({ message: "user created" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
  async updatePassword(req, res) {
    try {
      const { id } = req.params;
      const { oldPassword, newPassword, confirmPassword } = req.body;

      if (isEmpty(id)) throw new Error(ERROR_MESSAGE.USER.ID_EMPTY);
      if (isEmpty(oldPassword)) throw new Error(ERROR_MESSAGE.USER.PASSWORD_EMPTY)
      if (isEmpty(newPassword)) throw new Error(ERROR_MESSAGE.USER.NEW_PASSWORD_EMPTY)
      if (isEmpty(confirmPassword)) throw new Error(ERROR_MESSAGE.USER.CONFIRM_PASSWORD_EMPTY)

      await this.userService.updatePassword({ id, oldPassword, newPassword, confirmPassword });

      return res.status(200).json({ message: "Updated password" });

    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
  async deleteUser(req, res) {    
    try {
      const { id } = req.params
      const { password, confirmPassword } = req.body
  
      if (isEmpty(id)) throw new Error(ERROR_MESSAGE.USER.ID_EMPTY);
      if (isEmpty(password)) throw new Error(ERROR_MESSAGE.USER.PASSWORD_EMPTY)
      if (isEmpty(confirmPassword)) throw new Error(ERROR_MESSAGE.USER.CONFIRM_PASSWORD_EMPTY)
  
      await this.userService.deleteUser({ id, password, confirmPassword });
      return res.status(200).json({ message: "user deleted" });
      
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = UserController;

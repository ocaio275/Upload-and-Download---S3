const UserService = require("../user/user.service")
const ERROR_MESSAGE = require("../../utils/error-message");
const { hashPassword } = require("../../libs/crypton")

class AuthService {
  constructor() {
    this.userService = new UserService();
  }

  async generateToken({ email, password }) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new Error(ERROR_MESSAGE.USER.USER_NOT_FOUND);
    }

    const passwordIsValid = await this.verifyPassword(password, user.password);

    if (!passwordIsValid) {
      throw new Error(ERROR_MESSAGE.USER.PASSWORD_INCORRECT);
    }

    const token = await this.userService.generateToken(user);

    return token;   
  }
}

module.exports = AuthService;

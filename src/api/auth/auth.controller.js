const AuthService = require("./auth.service");
const ERROR_MESSAGE = require("../../utils/error-message");

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (isEmpty(email)) throw new Error(ERROR_MESSAGE.USER.EMAIL_EMPTY);
      if (isEmpty(password)) throw new Error(ERROR_MESSAGE.USER.PASSWORD_EMPTY);

      const token = await this.authService.generateToken({ email, password });

      return res.status(200).json({ token });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = AuthController;

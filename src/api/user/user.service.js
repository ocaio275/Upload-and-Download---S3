const UserRepository = require("./user.repository");
const crypto = require("crypto");
const ERROR_MESSAGE = require("../../utils/error-message");

const { SECRET_KEY } = process.env;

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }
  
  async findAllUsers() {
    return await this.userRepository.findAll();
  }

  async createUser(user) {
    const { email, password, confirmPassword } = user;

    this.verifyPasswordConfirmation(password, confirmPassword);
    await this.verifyEmail(email);
    const hashPassword = this.hashPassword(password);
    const userData = {
      email,
      password: hashPassword,
    };
    return await this.userRepository.createUser(userData);
  }

  verifyPasswordConfirmation(password, confirmPassword) {
    if (password !== confirmPassword) {
      throw new Error(ERROR_MESSAGE.USER.PASSWORD_DOES_NOT_MATCH);
    }
  }

  hashPassword(password) {
    return crypto
      .createHmac("sha256", SECRET_KEY)
      .update(password)
      .digest("hex");
  }

  async verifyEmail(email) {
    const user = await this.userRepository.findByEmail(email);
    if (user) {
      throw new Error(ERROR_MESSAGE.USER.EMAIL_ALREADY_IN_USE);
    }
  }

  async updatePassword(data) {
    const { id, oldPassword, newPassword, confirmPassword } = data;

    const userExists = await this.userRepository.findById(id)

    if (!userExists) {
      throw new Error(ERROR_MESSAGE.USER.USER_NOT_FOUND);
    }

    const hashOldPassword = this.hashPassword(oldPassword)
    if (hashOldPassword!== userExists?.password) {
      throw new Error(ERROR_MESSAGE.USER.OLD_PASSWORD_DOES_NOT_MATCH);
    }

    this.verifyPasswordConfirmation(newPassword, confirmPassword);

    const hashNewPassword = this.hashPassword(newPassword)

    return await this.userRepository.updatePassword(id, hashNewPassword);
  }

  async deleteUser(data) {
    const { id, password, confirmPassword } = data;

    const userExists = await this.userRepository.findById(id)

    if (!userExists) {
      throw new Error(ERROR_MESSAGE.USER.USER_NOT_FOUND);
    }

    this.verifyPasswordConfirmation(password, confirmPassword);

    return await this.userRepository.deleteUser(id);
  }

  async findById(id) {
    return await this.userRepository.findById(id);
  }

}

module.exports = UserService;

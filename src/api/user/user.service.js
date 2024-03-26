const UserRepository = require("./user.repository");
const ERROR_MESSAGE = require("../../utils/error-message");
const { hashPassword } = require("../../libs/crypton");
const { pick } = require("lodash");
const { encode } = require("../../libs/jwt");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async updateById(id, params) {
    return await this.userRepository.updateById(id, params);
  }

  async createUser(user) {
    const { email, password, confirmPassword } = user;

    this.verifyPasswordConfirmation(password, confirmPassword);
    await this.verifyEmail(email);
    const hashCreatePassword = hashPassword(password);
    const userData = {
      email,
      password: hashCreatePassword,
    };
    return await this.userRepository.createUser(userData);
  }

  verifyPasswordConfirmation(password, confirmPassword) {
    if (password !== confirmPassword) {
      throw new Error(ERROR_MESSAGE.USER.PASSWORD_DOES_NOT_MATCH);
    }
  }

  async verifyEmail(email) {
    const user = await this.userRepository.findByEmail(email);
    if (user) {
      throw new Error(ERROR_MESSAGE.USER.EMAIL_ALREADY_IN_USE);
    }
  }

  async updatePassword(data) {
    const { userId, oldPassword, newPassword, confirmPassword } = data;

    const userExists = await this.userRepository.findById(userId);

    if (!userExists) {
      throw new Error(ERROR_MESSAGE.USER.USER_NOT_FOUND);
    }

    const hashOldPassword = hashPassword(oldPassword);
    if (hashOldPassword !== userExists?.password) {
      throw new Error(ERROR_MESSAGE.USER.OLD_PASSWORD_DOES_NOT_MATCH);
    }

    this.verifyPasswordConfirmation(newPassword, confirmPassword);

    const hashNewPassword = hashPassword(newPassword);

    return await this.userRepository.updatePassword(userId, hashNewPassword);
  }

  async deleteUser(data) {
    const { userId, password, confirmPassword } = data;

    const userExists = await this.userRepository.findById(userId);

    if (!userExists) {
      throw new Error(ERROR_MESSAGE.USER.USER_NOT_FOUND);
    }

    this.verifyPasswordConfirmation(password, confirmPassword);

    return await this.userRepository.deleteUser(userId);
  }

  async findById(id) {
    return await this.userRepository.findById(id);
  }

  async findByEmail(email) {
    return await this.userRepository.findByEmail(email);
  }

  async generateToken({ email, password }) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error(ERROR_MESSAGE.USER.USER_NOT_FOUND);
    }

    const hashOldPassword = hashPassword(password);
    if (hashOldPassword !== user?.password) {
      throw new Error(ERROR_MESSAGE.USER.PASSWORD_INCORRECT);
    }
    const params = pick(user, ["id", "email"]);

    const token = encode(params);

    return token;
  }
}

module.exports = UserService;

const UserModel = require("./user.model");

class UsersRepository {
  constructor() {
    this.userModel = UserModel;
  }

  async createUser(user) {
    return await this.userModel.create(user);
  }

  async findByEmail(email) {
    return await this.userModel.findOne({
      where: {
        email,
      },
    });
  }

  async findById(id) {
    return await this.userModel.findByPk(id);
  }

  async updatePassword(id, password) {
    return await this.userModel.update({ password }, { where: { id } });
  }

  async deleteUser(id) {
    return await this.userModel.destroy({ where: { id } });
  }

  async updateById(id, params) {
    return await this.userModel.update(... params, { where: { id } });
  }
}

module.exports = UsersRepository;

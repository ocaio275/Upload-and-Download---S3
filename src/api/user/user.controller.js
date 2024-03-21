class UserController {
  async findAllUsers(req, res) {
    return res.status(200).json({ message: "users found" });
  }
  async createUser(req, res) {
    return res.status(200).json({ message: "user created" });
  }
  async updateUser(req, res) {
    return res.status(200).json({ message: "user updated" });
  }
  async deleteUser(req, res) {
    return res.status(200).json({ message: "user deleted" });
  }
}

module.exports = UserController;

const mongoose = require("mongoose");

const { MONGODB_URL_CONNECTION } = process.env;

class MongoDB {
  async connect() {
    await mongoose.connect(MONGODB_URL_CONNECTION);
  }
}

module.exports = new MongoDB();

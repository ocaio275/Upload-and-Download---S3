const crypto = require("crypto");
const { SECRET_KEY } = process.env;

const hashPassword = (password) => {
    return crypto
      .createHmac("sha256", SECRET_KEY)
      .update(password)
      .digest("hex");
}

module.exports = {
    hashPassword
}
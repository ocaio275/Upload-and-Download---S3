const jwt = require("jsonwebtoken");

const { SECRET_KEY, TOKEN_EXPIRATION_TIME } = process.env;

const encode = (params) => {
  return jwt.sign(params, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION_TIME });
};

const decode = (token) => {
  return jwt.decode(token, SECRET_KEY);
};

module.exports = {
  encode,
  decode
};

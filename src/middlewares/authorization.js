const passport = require("../libs/passportjs");

const authenticateJWT = () => {
  return passport.authenticate("jwt", { session: false });
};

module.exports = {
  authenticateJWT
};
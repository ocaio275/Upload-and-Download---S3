const { replace } = require("lodash");
const { decode } = require("../libs/jwt");
const validateUserId = () => {
  return async (req, res, next) => {
    const { userId } = req.params;
    const { authorization } = req.headers;

    const token = replace(authorization, "Bearer ", "");

    const { id } = decode(token);

    console.log(id, userId)

    if (id !== userId) {
      return res.status(401).json({
        message: "unauthorized",
      });
    }
    next();
  };
};

module.exports = {
  validateUserId,
};

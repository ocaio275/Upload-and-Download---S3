const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const UserService = require("../../api/user/user.service");
const ERROR_MESSAGE = require("../../utils/error-message")

const { SECRET_KEY } = process.env;

const userService = new UserService();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY,
};

async function findUserById(id) {
  try {
    const user = await userService.findById(id);
    return user;
  } catch (error) {
    throw new Error(ERROR_MESSAGE.USER.USER_NOT_FOUND);
  }
}

async function authenticateUser(jwt_payload, done) {
  try {
    const user = await findUserById(jwt_payload?.id);

    if (!user) {
      return done(null, false);
    }

    done(null, user);
  } catch (error) {
    done(error, false);
  }
}

passport.use(new JwtStrategy(options, authenticateUser));

module.exports = passport
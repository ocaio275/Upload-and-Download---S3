const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const UserService = require("../../api/user/user.service");

const { SECRET_KEY } = env.process;

const userService = new UserService();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY,
};

const validUser = async (jwtPayload, done) => {
  try {
    const user = await userService.findById(jwtPayload?.id);

    if (!user) {
      return done(null, false, { message: "User not found" });
    }

    done(null, user);
  } catch (error) {
    return done(null, false, { message: error.message });
  }
};

passport.use(new JwtStrategy(options, validUser(jwtPayload, done)));

module.exports = passport

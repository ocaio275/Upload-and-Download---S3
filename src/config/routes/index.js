const UserRouter = require('../../api/user/user.route')
const { API_VERSION } = process.env

const Router = (app) => {
    app.use(API_VERSION, UserRouter);
}

module.exports = Router
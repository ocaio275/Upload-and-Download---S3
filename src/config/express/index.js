const cors = require("cors")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const morgan = require("morgan")

const Express = (app) => {
    app.use(cors())
    app.options('*', cors())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(morgan("dev"))
    app.use(bodyParser.json())
    app.use(cookieParser())
} 

module.exports = Express
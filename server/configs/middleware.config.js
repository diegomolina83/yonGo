const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const cors = require('cors')

const whitelist = ['https://yongoclient.herokuapp.com', process.env.DOMAIN_REMOTE, process.env.DOMAIN]
const corsOptions = {
    origin: (origin, cb) => {
        const originIsWhitelisted = true
        cb(null, originIsWhitelisted)
    },
    credentials: true
}

module.exports = app => {
    app.use(cors(corsOptions))
    app.use(logger('dev'))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(cookieParser())
}

// whitelist.includes(origin)
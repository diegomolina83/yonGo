require('dotenv').config()

const socketio = require('socket.io')


// Database
require('./configs/mongoose.config')

// Debugger
require('./configs/debugger.config')

// Cloudinary
require('./configs/cloudinary.config')

// App
const express = require('express')
const app = express()



//Socket
const http = require('http')
const PORT = 5000

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js')
const uploader = require('./configs/cloudinary.config')

const server = http.createServer(app)
const io = socketio(server)
server.listen(PORT, () => console.log(`Server has started on port ${PORT}`))

io.on('connection', (socket) => {
    console.log("tenemos conexion con socket")

    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room })

        if (error) return callback(error)

        socket.emit('message', { user: "admin", text: `${user.name}, bienvenid@ al plan ${user.room}` })
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name},se ha unido!` })
        socket.join(user.room)

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })
        callback()
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)

        io.to(user.room).emit('message', { user: user.name, text: message })
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })


        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if (user) {
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} ha salido del chat` })
        }
    })
});

// Configs
require('./configs/preformatter.config')(app)
require('./configs/middleware.config')(app)
require('./configs/views.configs')(app)
require('./configs/passport.config')(app)
require('./configs/locals.config')(app)
// require('./configs/socket.config')(app)


// Routes index
require('./routes')(app)

module.exports = app

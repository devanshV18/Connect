const express = require("express")
const { Server } = require('socket.io')
const http = require('http')


const app = express()

//socket connections
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true
    }
})

io.on('connection', (socket) => {
    console.log("connected User ", socket.id)

    io.on('disconnect', () => {
        console.log('disconnected user ', socket.io)
    })
})

module.exports = {
    app,
    server
}


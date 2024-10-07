const express = require("express")
const { Server } = require('socket.io')
const http = require('http')
const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken")
const UserModel = require("../models/UserModel")
const ConversationModel = require("../models/ConversationModel")


const app = express()

//socket connections
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true
    }
})

//Online user
const onlineUser = new Set()


io.on('connection', async(socket) => {
    console.log("connected User ", socket.id)

    const token = socket.handshake.auth.token

    //current user details
    const user = await getUserDetailsFromToken(token)
    
    //create a room
    socket.join(user?._id)
    onlineUser.add(user?._id.toString())

    io.emit('onlineUser', Array.from(onlineUser))

    socket.on('message-page', async(userId) => {
        console.log('user id', userId)
        const userDetails = await UserModel.findById(userId).select("-password")

        // console.log("userDetails", userDetails)

        const payload = {
            _id: userDetails?._id,
            name: userDetails?.name,
            email: userDetails?.email,
            profile_pic: userDetails?.profile_pic,
            online: onlineUser.has(userId)
        }

        // console.log("payload", payload)

        socket.emit("message-user", payload)

    })

    //new message
    socket.on('new message', async(data) => {
        const conversation = await ConversationModel.findOne({
            "$or" : [
                { sender : data?.sender, receiver : data?.receiver},
                { sender : data?.receiver, receiver : data?.sender}
            ]
        })

        console.log('new message', data)
    })

    socket.on('disconnect', () => {
        onlineUser.delete(user?._id)
        console.log('disconnected user ', socket.id)
    })
})

module.exports = {
    app,
    server
}


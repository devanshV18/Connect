const mongoose = require("mongoose")



const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        default: ""
    },
    imageUrl: {
        type: String,
        default: ""
    },
    videoUrl: {
        type: String,
        default: ""
    },
    seen: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const conversationSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.objectId,
        required: true,
        ref: 'User'
    },
    reciever: {
        type: mongoose.Schema.objectId,
        required: true,
        ref: 'User'
    },
    messages: [
        {
            type: mongoose.Schema.objectId,
            ref: 'Message'
        }
    ]
}, {
    timestamps: true
})

const MessageModel = mongoose.model("Message", messageSchema)
const ConversationModel = mongoose.model("Conversation", conversationSchema)

module.exports = {
    MessageModel,
    ConversationModel
}
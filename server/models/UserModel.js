const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name cannot be empty"]
    },
    email: {
        type: String,
        required: [true, "An email has to be entered"]
    },
    password: {
        type: String,
        required: [true, "Please priovide a password"]
    },
    profile_pic: {
        type: String,
        default: ""
    }
},{
    timestamps: true
})

const UserModel = mongoose.model("User", userSchema)

module.exports = UserModel
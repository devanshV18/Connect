const jwt = require('jsonwebtoken')
const UserModel = require('../models/UserModel')

const getUserDetailsFromToken = async (token) => {
    if(!token){
        return {
            message: "Session Timed Out",
            logout: "true"
        }
    }

    //stores decoded jwt in its object form as per the the paylaod sent while constructing it. In our case we send id, email 
    const decode = await jwt.verify(token,process.env.JWT_SECRET)

    //using the decoded id from the jwt from cookies we can identify the user to which the jwt belongs to and identify our user
    const user = await UserModel.findById(decode.id).select('-password')

    return user
}

module.exports = getUserDetailsFromToken
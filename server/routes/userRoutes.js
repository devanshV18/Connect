const express = require('express')
const {registerUser, checkEmail, checkPassword, userDetails, logout, updateUserDetails, searchUser} = require('../controllers/userController')

const router = express.Router()

//create user api
router.post('/register', registerUser)
router.post('/checkemail', checkEmail)
router.post('/checkpassword', checkPassword)

//logged in User's details using the token sent in cookies
router.get('/userdetails',userDetails)
router.get('/logout', logout)
router.post('/update-user-details', updateUserDetails)
router.post('/search-user', searchUser)

module.exports = router
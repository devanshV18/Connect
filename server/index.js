const express = require('express')
const cors = require('cors')
require('dotenv').config()
const {connectDb} = require('./config/connectDb')
const cookieParser = require('cookie-parser')



const app = express()
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())


const PORT = process.env.PORT || 8080

app.get('/', (req,res) => {
    res.json({
        message: "Server is Running"
    })
})

app.use('/api/users',require("./routes/userRoutes"))



connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at ${PORT}`)
    })
})



const cookieParser = require('cookie-parser')
const express = require('express')

require('dotenv').config()
const app = express()

//regular middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//cookie middleware
app.use(cookieParser())

const userRouter = require('./routes/userRoutes')
const postRouter = require('./routes/postRoutes')

app.use('/api', userRouter)
app.use('/api', postRouter)


app.get('/', (req, res) => {
    res.send("Hi from youtube live")
})

const PORT = process.env.PORT || 8000;  // Default to port 8000 if PORT is not defined

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

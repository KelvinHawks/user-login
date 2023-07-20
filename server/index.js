const dotenv = require('dotenv')
const express =require('express')
const app = express()
const cors = require('cors')
const connection = require('./db')
const userRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')
dotenv.config()
//database connection
connection()
//middleware
app.use(express.json())
app.use(cors())

const port = process.env.PORT || 5000

app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)

app.listen(port, ()=>{
    console.log(`app listening on port ${port}`);
})
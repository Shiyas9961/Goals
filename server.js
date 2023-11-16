const express = require('express')
require('dotenv').config()
const app = express()
const connectDB = require('./config/db')
const goalRouter = require('./routes/goalRouters')
const userRoutes = require('./routes/userRoutes')
const cors = require('cors')

app.use(express.json())
app.use(cors())

app.use('/api/goals',goalRouter)
app.use('/api/users',userRoutes)
const PORT = process.env.PORT

connectDB()
app.listen(PORT,()=>console.log(`Server is running at PORT no ${PORT}`))

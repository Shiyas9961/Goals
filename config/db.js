const mongoose = require('mongoose')

const connectDB = async () => {
    try{
        const url = mongoose.connect(process.env.DB_URL)
        console.log(`DB is connected ${(await url).connection.host}`)
    }catch(err){
        console.log(err.message)
    }
}

module.exports = connectDB
const mongoose = require("mongoose")

module.exports = async()=>{
    const connectionParam ={
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
    try {
        await mongoose.connect(process.env.MONGO_URL, connectionParam)
        console.log('Connection successful');
    } catch (error) {
        console.log(`error: ${error}`);
    }
}


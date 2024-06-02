require('dotenv').config();
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;


exports.connectDB = async()=>{
    try {
        const connect = await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDb connected at ',connect.connection.host);
    } catch (error) {
        
    }
}






const mongoose = require('mongoose');

const connectDB = async ()=> {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/Movie-booking',{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("mongo db database connected")
    } catch (error) {
        console.log(error.message)
        process.exit(1);
        
    }

};

module.exports=connectDB;
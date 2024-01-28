const mongoose = require("mongoose");

const connDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }catch(e){
        console.log(`Enable to connect : ${e}`);
        process.exit();
    }

}

module.exports = connDB;
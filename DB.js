const express = require("express");
const app = express();
const mongoose = require("mongoose");

const DB = module.exports = () =>{
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    try {
        var url = "mongodb://127.0.0.1:27017/"
        mongoose.connect(url, connectionParams)
        console.log("DB connected succesfully");
    } catch(error){
        console.log("DB connection failed:  "+ error);
    }
}

DB();

// app.listen(3004, () => {
//     console.log("Server is running on port 3004");
// });

// Node DB.js to run
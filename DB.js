const mongoose = require('mongoose');

mongoose
    .connect("mongodb://saleh:123212@ac-be76ygv-shard-00-00.vl0hwsk.mongodb.net:27017,ac-be76ygv-shard-00-01.vl0hwsk.mongodb.net:27017,ac-be76ygv-shard-00-02.vl0hwsk.mongodb.net:27017/?ssl=true&replicaSet=atlas-8rnlhc-shard-0&authSource=admin&retryWrites=true&w=majority")
    .then(() => {
        console.log("Connected to MongoDB");

        mongoose.connection.close();
        process.exit(0);

    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    });
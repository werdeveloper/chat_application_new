const mongoose = require('mongoose'),
    config = require('config'),
    mongoDbConfig = config.get('mongodb');

    mongoDBUrl = mongoDbConfig.url;
    // mongoDBUrl = "mongodb+srv://deep:deep123@cluster0-qzwy9.mongodb.net/nodejs-mongo-api?retryWrites=true&w=majority";
    console.error(`MongoDB URL ------------------- `, mongoDBUrl);

mongoose.connect(
    mongoDBUrl,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    function(err){
        if(err) {
            console.log(err);
        } else{
            console.log("MongoDB is connected");
        }
    }
);
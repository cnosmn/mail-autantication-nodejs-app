const mongoose = require('mongoose');

//connect db
mongoose
.connect(process.env.DATABASE,{
    dbName: "mailVerification",
    useNewUrlParser : true,
    })
.then(()=> console.log("db connected established"))
.catch(err=> console.log("db connection error: ",err));

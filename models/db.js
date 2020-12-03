const mongoose=require('mongoose');

// Connecting to the database
mongoose.connect(databaseURL,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false}).then(()=>{
    console.log("successfully conneected to database.......");
}).catch(databaseConnectionError=>{
    console.log("error while connecting to database",databaseConnectionError.stack);
    process.exit(1);
});


require('./hospital.model');
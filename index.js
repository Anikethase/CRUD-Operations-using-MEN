
const express=require('express');
const body_parser=require('body-parser');
const mongoose=require('mongoose');


const hospitalController = require('./controllers/hospitalController');


const databaseURL='mongodb://localhost:27017/HospitalDB';
const app=express();
const port=3010;

app.use(body_parser.json());
app.use('/hospital', hospitalController);


// Connecting to the database
mongoose.connect(databaseURL,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false}).then(()=>{
    console.log("successfully conneected to database.......");
}).catch(databaseConnectionError=>{
    console.log("error while connecting to database",databaseConnectionError.stack);
    process.exit(1);
});



//Starting a server
app.listen(port,()=>{
    console.log("server is running on port "+port);
});




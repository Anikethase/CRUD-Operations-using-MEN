
const express=require('express');
const body_parser=require('body-parser');
const mongoose=require('mongoose');
const path = require('path');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

const hospitalController = require('./controllers/hospitalController');


const databaseURL='mongodb://localhost:27017/HospitalDB';
const app=express();
const port=3010;


app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname : 'hbs', defaultLayout : 'mainLayout', layoutsDir:__dirname + '/views/layouts/',
handlebars: allowInsecurePrototypeAccess(Handlebars) }));
app.set('view engine', 'hbs');

app.use(body_parser.urlencoded({extended:true}));
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




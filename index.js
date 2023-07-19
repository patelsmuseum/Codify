const express = require('express');
const app = express();

//importing cookie parser
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const port = 8000;
const path = require('path');

// importing database 
const db = require('./config/mongoose');



//importing ejs for template engine 
app.set('view engine' , 'ejs');

//adding layout modules
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
//extract styles and script from sub pages into the layout
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true );

//for storing the static files 
app.use(express.static(path.join(__dirname,'assests')));

// use express router 
app.use('/' , require('./routes'));


//listening to the port 
app.listen(port , function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`server is running on port : ${port}`);
});
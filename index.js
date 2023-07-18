const express = require('express');
const app = express();
const port = 8000;
const path = require('path');



//importing ejs for template engine 
app.set('view engine' , 'ejs');

//adding layout modules
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

//for storing the static files 
app.use(express.static(path.join(__dirname,'assests')));

// use express router 
app.use('/' , require('./routes'));



app.listen(port , function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`server is running on port : ${port}`);
});
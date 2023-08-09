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

// importing passport
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');


//importing connect - mongo for persistent storage
const MongoStore = require('connect-mongo'); 

//importing flash
const flash = require('connect-flash');
const customeMiddleware = require('./config/middleware');


//importing ejs for template engine 
app.set('view engine' , 'ejs');


//using session library and passport 
app.use(session({
    name:'codify',
    secret:'blashsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge: (1000 * 60 * 100)
    },
    // store: new MongoStore(      
    //     {
    //       mongooseConnection: db,
    //       autoRemove: 'disabled'
    //     },
    //     function(err) {
    //       console.log(err || 'connect-mongodb is ok');
    //     }
    //   )

    store: MongoStore.create({
        mongoUrl:'mongodb://127.0.0.1:27017/codify_development',
        mongooseConnection : db,
        autoRemove: 'disabled'
    },
     function(err){
        console.log(err || 'connect-mongodb is ok ');
     }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//using flash
app.use(flash());
app.use(customeMiddleware.setFlash);



//adding layout modules
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
//extract styles and script from sub pages into the layout
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true );

//for storing the static files 
app.use(express.static(path.join(__dirname,'assests')));

//make the uploads path available to broswer
app.use('/uploads' , express.static(__dirname +  '/uploads'));

// use express router 
app.use('/' , require('./routes'));


//listening to the port 
app.listen(port , function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`server is running on port : ${port}`);
});
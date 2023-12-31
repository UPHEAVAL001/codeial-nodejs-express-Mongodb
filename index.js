const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

//library for layouts in views 
const expressLayouts = require('express-ejs-layouts');

//connecting to mongodb database
const db = require('./config/mongoose');

//Used for Session cookie
const session = require('express-session'); 
const passport = require('passport');
const passportLocal = require('./config/passport-local-startegy');
const MongoStore = require('connect-mongo')(session);

// as node-sass is deprecated so i have used just sass for that i have installed it npm i sass and then just added the script in package.json for src and dest thats it i.e. "scss": "sass --watch assets/scss:assets/CSS"
//const sassMiddleware = require('node-sass-middleware');

 
// app.use(sassMiddleware({
//     src: './assets/scss',
//     dest: './assets/CSS',
//     debug: true,
//     outputStyle: 'extended',
//     prefix: '/CSS'
// }))





//to read from the post requests
app.use(express.urlencoded());

app.use(cookieParser());

//for static style and JS files
app.use(express.static('./assets'));
app.use(expressLayouts);

//extract style and scripts from sub-pages into the layout
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true);



// set up view engine

app.set('view engine' , 'ejs');
app.set('views' , './views');


//Mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    //TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge:(1000 * 60 * 100)
    },
    store:new MongoStore({
            mongooseConnection:db,
            autoRemove: 'disabled'
        },function(err){
            console.log(err || 'connect-mongodb setup Ok');
        })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use express router
app.use('/' , require('./routes')); 


app.listen(port , function(err){

    if(err){
        //console.log('Error' , err);
        console.log(`Error in running the server : ${port}`);// interpolation - use of variable inside a string using back ticks
    }

    console.log(`Server is running on port : ${port}`);
}); 
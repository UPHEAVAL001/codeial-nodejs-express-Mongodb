const express = require('express');
const app = express();
const port = 8000;

//library for layouts in views 
const expressLayouts = require('express-ejs-layouts');

//for static style and JS files
app.use(express.static('./assets'));

app.use(expressLayouts);

//extract style and scripts from sub-pages into the layout
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true);
//use express router
app.use('/' , require('./routes'));

// set up view engine

app.set('view engine' , 'ejs');
app.set('views' , './views');


app.listen(port , function(err){

    if(err){
        //console.log('Error' , err);
        console.log(`Error in running the server : ${port}`);// interpolation - use of variable inside a string using back ticks
    }

    console.log(`Server is running on port : ${port}`);
}); 
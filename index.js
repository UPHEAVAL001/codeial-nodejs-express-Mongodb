const express = require('express');
const app = express();
const port = 8000;

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
const express = require('express');
const app = express();
const port = 8000;

app.use('/' , require('./routes'));

app.listen(port , function(err){

    if(err){
        //console.log('Error' , err);
        console.log(`Error in running the server : ${port}`);// interpolation - use of variable inside a string using back ticks
    }

    console.log(`Server is running on port : ${port}`);
}); 
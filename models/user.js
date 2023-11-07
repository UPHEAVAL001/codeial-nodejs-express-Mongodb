const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    name: {
        type: String,
        required : true
    }
} , {
    timestamps: true     // mongoose does this for us and store the created at and updated at fields for each document.
});

const User = mongoose.model('User' , userSchema);

module.exports = User; 
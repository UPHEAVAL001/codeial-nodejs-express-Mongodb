// database setup

const User = require('../models/user');


module.exports.profile = function (req, res) {
    //return res.end('<h1>User Profile</h1>');

    return res.render('profile', {
        "title": "Akhil"
    });
}

// to render sign up page
module.exports.signUp = function (req, res) {

    return res.render('user_sign_up', {
        "title": "Codeial | Sign Up"
    })
}

//to render sign in page
module.exports.signIn = function (req, res) {

    return res.render('user_sign_in', {
        "title": "Codeial | Sign In"
    })
}


// get the sign up data 
module.exports.create = function(req, res){
    
    if(req.body.password != req.body.cnfpassword){
        //window.alert('Password does not matches confirm password field');
        
        return res.redirect('back');
    }
    User.findOne({email : req.body.email})
    .then(function(user){
        if(!user){
            User.create({
                email: req.body.email,
                password: req.body.password,
                name: req.body.name
            })
            .then(function (newUser, err) {
                console.log('*******', newUser);
                return res.redirect('/users/sign-in');
            })
            .catch(function (err) {
                console.log('error in collecting sign up data', err);
            });
        }else{
            //window.alert('UserId already exist please choose another email');
            return res.redirect('back');
        }
    })
    .catch(function (err) {
        console.log('error in finding user for signing up', err);
    });
    

}


// sign in and create a session for the user
module.exports.createSession = function(req,res){
    
    User.find({email : req.body.email , password : req.body.password})
    .then(function(user){
        return res.render('user_session',{
            "title": "Codeial | User Session",
            "user_data" : user
        });
    })
    .catch(function(err){
        console.log('Error in user Authentication' , err);
    });

    
};


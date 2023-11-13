// database setup

const User = require('../models/user');


module.exports.profile = function (req, res) {
    //return res.end('<h1>User Profile</h1>');

    if(req.cookies.user_id){
        User.findById(req.cookies.user_id)
        .then(function(user){
            if(user){
                return res.render('user_profile',{
                    "title": "User Profile Page Session",
                    "user_data" : user
                });
            }
            return res.redirect('users/sign-in');
        })
        .catch(function (err) {
            console.log('error in finding user for signing in', err);
        });

    }else{
        return res.redirect('/users/sign-in');
    }
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
    //steps to authenticate

    //find the user
    User.findOne({email : req.body.email})
    .then(function(user){
        //handle user found
        if(user){
            //password doesn't match
            if(user.password != req.body.password){
                return res.redirect('back');
            }
            // handle session creation
            res.cookie('user_id' , user._id);

            return res.redirect('/users/profile');


        }else{
            //handle user not found
            return res.redirect('back');
        }
    })
    .catch(function(err){
        console.log('Error in finding user in signing in' , err);
    });
   
};

module.exports.signOut = function(req,res){

    // way to expire a cookie
    // res.cookie('user_id' , req.cookies.user_id , {expires: new Date(27373829000)});

    // works same but clears the cookie without any specific time 
    res.clearCookie('user_id', { path: '/' });

    return res.redirect('/users/sign-in');
};


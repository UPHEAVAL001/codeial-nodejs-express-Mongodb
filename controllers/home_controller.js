
const User = require('../models/user');

const Post = require('../models/post');

module.exports.home = function(req,res){
    //return res.end('<h1>Express is up for Codeial!</h1>')
    //console.log(req.cookies);
    //res.cookie('user_id', 'a38641');

    // Post.find({})
    // .then(function(posts){
    //     return res.render('home', {
    //         'title': 'HOMEPAGE',
    //         'Post' : posts
    //     }); 
    // })
    // .catch(function(err){
    //     console.log('error in finding posts' , err);
    // })

    //populate the user of each post
    Post.find({})
    .populate('user')
    .populate({path:'comments',populate: {path: 'user'}})
    .exec()
    .then(function(posts){

        User.find({})
        .then(function(users){
            return res.render('home', {
                'title': 'HOMEPAGE',
                'Post' : posts,
                'all_users' : users
            });
        })
        .catch(function(err){
            console.log('error in finding users' , err);
        })
         
    })
    .catch(function(err){
        console.log('error in finding posts' , err);
    })



    
}

//module.exports.actionName = function(){}
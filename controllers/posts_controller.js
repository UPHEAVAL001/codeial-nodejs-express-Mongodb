const Post = require('../models/post');

const Comment = require("../models/comment");

module.exports.createPost = function(req,res){
    // if(!req.user){
    //     console.log('user not logged in');
    //     return res.redirect('back');
    // }
    Post.create({
        content : req.body.content,
        user: req.user._id
    })
    .then(function (newPost, err) {
        console.log('*******', newPost);
        return res.redirect('back');
    })
    .catch(function (err) {
        console.log('error in collecting post data', err);
    });
};

module.exports.destroy = function(req,res){
    
    Post.findById(req.params.id)
    .then(function (post) {
        
        // .id means converting the objectID into String
        if(post.user == req.user.id){
            Post.findByIdAndDelete(req.params.id)
            .then(function(){
                Comment.deleteMany({post: req.params.id})
                .then(function(){
                    return res.redirect('back');
                })
                .catch(function(err){
                    console.log('error in destroying the comments', err);
                })
            })       
        }else{
            return res.redirect('back');
        }
    })
    .catch(function (err) {
        console.log('error in finding the post', err);
    });
}


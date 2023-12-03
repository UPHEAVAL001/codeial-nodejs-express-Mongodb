const Comment = require('../models/comment');

const Post = require('../models/post');

module.exports.create = function(req,res){

    Post.findById(req.body.post)
    .then(function(post){
        if(post){
            Comment.create({
                content : req.body.content,
                user: req.user._id,
                post: req.body.post
            })
            .then(function (newComment) {
                console.log('*******', newComment);
                post.comments.push(newComment);
                post.save();
                console.log('*******', post);
                return res.redirect('/');
            })
            .catch(function (err) {
                console.log('error in creating comment', err);
            });
        }
    })
    .catch(function (err) {
        console.log('error in finding post to add comment', err);
    });
}

module.exports.destroy = function(req,res){
    
    Comment.findById(req.params.id)
    .then(function (comment) {
        // .id means converting the objectID into String
        if(comment.user == req.user.id){
            let postId = comment.post;
            Post.findById(postId)
            .then(function(post){
                post.comments.pull(req.params.id);
                post.save();
                console.log(post);
                Comment.findByIdAndDelete(req.params.id)
                .then(function(){
                    return res.redirect('back');
                })
                .catch(function(err){
                    console.log('error in deleting the comment', err);
                })
            })
            .catch(function(err){
                console.log('error in updating the post', err);
            })      
        }else{
            return res.redirect('back');
        }
    })
    .catch(function (err) {
        console.log('error in finding the comment', err);
    });
}
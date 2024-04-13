const Post = require('../models/posts');
const Comment = require('../models/comment');

module.exports.create = function(req, res){
    const data = req.body;
    //find post
    Post.findById(data.post)
    //if post exist create comment
    .then((post) => {
        //create comment
        Comment.create({
            content: data.content,
            post: data.post,
            user: req.user._id,
        })
        .then((comment)=>{
            console.log('Comment added successfully');
            //add comment in comment array
            post.comments.push(comment._id);
            //save in DB
            post.save();
            return res.redirect('back');
        })
    })
    .catch((err)=>{
        console.log(err);
        return res.redirect('back');
    })
}
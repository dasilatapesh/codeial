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


module.exports.deleteComment = function(req, res){
    const id = req.params.id;
    if(!id){
        console.log("Id required");
        return res.redirect('back');
    }
    Comment.findById(id)
    .then((comment) => {
        //check user who posted and user who is requesting to delete are same
        if(comment.user.toString() === req.user.id){
            //fetech post id
            const postId = comment.post;
            // Delete the post
            comment.deleteOne()
            .then(() => {
                console.log("Deleted Succesfully");
            })
            .catch(err => {
                console.log(err);
                return res.redirect('back');
            });

            Post.findByIdAndUpdate(postId,{ $pull: {comments: id}})
            .then(()=>{
                console.log('Removed from array');
                return res.redirect('back');
            })
            .catch((errr)=>{
                console.log(errr);
                return res.redirect('back');
            })

        } else {
            console.log("Unauthorized");
            return res.redirect('back');
        }
    })
    .catch((err) => {
        console.log(err);
        return res.redirect('back');
    });
}
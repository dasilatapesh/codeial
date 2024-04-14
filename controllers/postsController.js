const Post = require("../models/posts");
const Comment = require("../models/comment");
//***********************for posts***********************//

module.exports.createPost = function(req, res){
    Post.create({
         content: req.body.content,
         user: req.user._id,
    })
    .then(()=>{
        console.log("posted successfully");
        return res.redirect('back');
    })
    .catch((err)=>{
        console.log("Error in creating post:", err);
        return res.redirect("back");
    });
};

module.exports.deletePost = function(req, res){
    const id = req.params.id;
    if(!id){
        console.log("Id required");
        return res.redirect('back');
    }
    Post.findById(id)
    .then((post) => {
        //check user who posted and user who is requesting to delete are same
        if(post.user.toString() === req.user.id){
            if (!post) {
                console.log("Post not found");
                return res.redirect('back');
            }
            // Delete the post
            post.deleteOne()
            .then(() => {
                // Delete comments associated with the post
                Comment.deleteMany({post: id})
                .then(() => {
                    return res.redirect('back');
                })
                .catch(err => {
                    console.log(err);
                    return res.redirect('back');
                });
                console.log("Deleted Succesfully");
            })
            .catch(err => {
                console.log(err);
                return res.redirect('back');
            });
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
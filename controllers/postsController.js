const Post = require("../models/posts");

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
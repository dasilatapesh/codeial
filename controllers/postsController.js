const Post = require("../models/posts");
const Comment = require("../models/comment");
//***********************for posts***********************//

module.exports.createPost = async function(req, res){
    // Post.create({
    //      content: req.body.content,
    //      user: req.user._id,
    // })
    // .then(()=>{
    //     console.log("posted successfully");
    //     return res.redirect('back');
    // })
    // .catch((err)=>{
    //     console.log("Error in creating post:", err);
    //     return res.redirect("back");
    // });

    try{
        const data = req.body;

        const post = await Post.create({
                    content: data.content,
                    user: req.user._id,
                });

        console.log("posted successfully");

        return res.redirect('back');

    }catch(err){
        console.log("Error in creating post:", err);
        return res.status(500).send('Error');
    }
};

module.exports.deletePost = async function(req, res){
    try{
        const id = req.params.id;
        if(!id){
            console.log("Id required");
            return res.status(400).send('Id required');
        }

        const post = await Post.findById(id);

        if (!post) {
            console.log("Post not found");
            return res.status(404).send('post not found');
        }

        if(post.user.toString() === req.user.id){

            const deletedPost = await post.deleteOne();

            const commentDeleted = await Comment.deleteMany({post: id});

            console.log("Deleted Succesfully");
        }else{
            console.log("Unauthorized");
            return res.status(401).send('Unauthorized');
        }
        return res.redirect('back');   
    }catch(err){
        console.log("Error in creating post:", err);
        return res.status(500).send('Error');
    }
    
    // Post.findById(id)
    // .then((post) => {
    //     //check user who posted and user who is requesting to delete are same
    //     if(post.user.toString() === req.user.id){
    //         if (!post) {
    //             console.log("Post not found");
    //             return res.redirect('back');
    //         }
    //         // Delete the post
    //         post.deleteOne()
    //         .then(() => {
    //             // Delete comments associated with the post
    //             Comment.deleteMany({post: id})
    //             .then(() => {
    //                 return res.redirect('back');
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //                 return res.redirect('back');
    //             });
    //             console.log("Deleted Succesfully");
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             return res.redirect('back');
    //         });
    //     } else {
    //         console.log("Unauthorized");
    //         return res.redirect('back');
    //     }
    // })
    // .catch((err) => {
    //     console.log(err);
    //     return res.redirect('back');
    // });
}
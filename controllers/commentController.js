const Post = require('../models/posts');
const Comment = require('../models/comment');
const commentsMailer = require('../mailers/commentMailer');
const kue = require('kue');
const emailWorker = require('../worker/commentEmailWorker');
const Likes = require('../models/likes');


module.exports.create = async function(req, res){
    try{
        const data = req.body;

        const post = await Post.findById(data.post);

        const comment = await Comment.create({
            content: data.content,
            post: data.post,
            user: req.user._id,
        });
        if(!comment){
            console.log('comment not created');
        }
         //add comment in comment array
        post.comments.push(comment._id);
        post.save();
        req.flash('success', 'Comment added successfully');
        await comment.populate('user' , 'name email');
        // commentsMailer.newComment(comment);
        console.log("***********",comment,"********");

        const job = emailWorker.create('emails', comment).save(function(err){
            if(err){
                console.log(err);
            }
            console.log(job.id);
        });
        if(req.xhr){
            return res.status(200).json({
                data:{
                    comment: comment,
                    success: req.flash('success'),
                },
                message: 'Comment created',
            });
        }
        console.log('refreshed'); 
        return res.redirect('back');
    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
    // const data = req.body;
    // //find post
    // Post.findById(data.post)
    // //if post exist create comment
    // .then((post) => {
    //     //create comment
    //     Comment.create({
    //         content: data.content,
    //         post: data.post,
    //         user: req.user._id,
    //     })
    //     .then((comment)=>{
    //         console.log('Comment added successfully');
    //         //add comment in comment array
    //         post.comments.push(comment._id);
    //         //save in DB
    //         post.save();
    //         return res.redirect('back');
    //     })
    // })
    // .catch((err)=>{
    //     console.log(err);
    //     return res.redirect('back');
    // })
}


module.exports.deleteComment = async function(req, res){

    try{
        const id = req.params.id;
        if(!id){
            console.log("Id required");
            return res.redirect('back');
        }

        const comment = await Comment.findById(id);

        //check user who posted and user who is requesting to delete are same
        if(comment.user.toString() === req.user.id){
            //fetch post id
            const postId = comment.post;

            //delete associated likes of the comment
            await Likes.deleteMany({
                likeable: comment,
                onModel: 'Comment'
            });
            // Delete the comment
            const deletedComment = await comment.deleteOne();

            console.log("Deleted Succesfully");

            const removedFromPost = await Post.findByIdAndUpdate(postId,{ $pull: {comments: id}});

            console.log('Removed from array');
        }else {
            console.log("Unauthorized");
            return res.status(401).send('unauthorized');
        }

        req.flash('success', 'Successfully Deleted Comment');

        if(req.xhr){
            return res.status(200).json({
                data: {
                    commentId: id,
                    success: req.flash('success'),
                },
                message: "Comment deleted"
            });
        }

        return res.redirect('back');

    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
    // const id = req.params.id;
    // if(!id){
    //     console.log("Id required");
    //     return res.redirect('back');
    // }
    // Comment.findById(id)
    // .then((comment) => {
    //     //check user who posted and user who is requesting to delete are same
    //     if(comment.user.toString() === req.user.id){
    //         //fetech post id
    //         const postId = comment.post;
    //         // Delete the post
    //         comment.deleteOne()
    //         .then(() => {
    //             console.log("Deleted Succesfully");
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             return res.redirect('back');
    //         });

    //         Post.findByIdAndUpdate(postId,{ $pull: {comments: id}})
    //         .then(()=>{
    //             console.log('Removed from array');
    //             return res.redirect('back');
    //         })
    //         .catch((errr)=>{
    //             console.log(errr);
    //             return res.redirect('back');
    //         })

    //     } else {
    //         console.log("Unauthorized");
    //         return res.status(401).send('unauthorized');
    //     }
    // })
    // .catch((err) => {
    //     console.log(err);
    //     return res.redirect('back');
    // });
}
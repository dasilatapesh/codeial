const Like = require('../models/likes');
const Post = require('../models/posts');
const Comment = require('../models/comment');

module.exports.toggleLike = async (req, res) => {
    try {
        //link will be --> likes/toggle/?id=abc&type=Post
        let likeable;
        let deleted = false;
        if(req.query.type=='Post'){
            likeable = await Post.findById(req.query.id).populate('likes'); 
        }else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }
        //check if like already present

        const existingLike = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id,
        });

        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();
            await existingLike.deleteOne();
            deleted = true;
        }else{
            const newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            });
            console.log(newLike);

            likeable.likes.push(newLike._id);
            likeable.save();
        }

        console.log(likeable.likes);

        return res.status(200).json({
            message: 'Successfull',
            data:{
                deleted: deleted,
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server Error'
        });
    }
}
const Posts = require('../../../models/posts');
const Comment = require('../../../models/comment');

module.exports.getPosts = async function(req, res, next){
    try {
        const posts = await Posts.find();
        return res.status(200).json({
            message: "Posts fetched successfully",
            posts: posts,
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: 'Error getting posts.',
            error: error,
        });
    }
}

module.exports.destroyPosts = async function(req, res){
    try {
        const id = req.params.id;
        const post = await Posts.findById(id);
        if(!post){
            return res.status(404).json({
                message: 'Post not found',
            });
        }
        // console.log();
        if(post.user == req.user.id){
            const comment = await Comment.deleteMany({post: post._id});
            const deletedPost = await Posts.findByIdAndDelete(id);
            return res.status(200).json({
                message: 'Post deleted and associated comment deleted!!',
                post: post,
                comment: comment,
            });
        }else{
            return res.status(422).json({
                message: 'Unauthorized to access. Sign-in to access this page.',
            });
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server Error!',
            error,
        });
    }
}
const Posts = require('../../../models/posts');

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
        const post = await Posts.findByIdAndDelete(id);
        if(!post){
            return res.status(404).json({
                message: 'Post not found',
            });  
        }
        return res.status(200).json({
            message: 'Post deleted!',
            post,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Error!',
            error,
        });
    }
}
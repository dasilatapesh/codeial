const Mongoose = require("mongoose");
const postsSchema = new Mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    user: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    //include the array of all comments in this post schema itself
    comments: [
        {
            type: Mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    likes:[
        {
            type: Mongoose.Schema.Types.ObjectId,
            ref: 'Likes',
        }
    ],
},
{
    timestamps: true,
});

const Post = Mongoose.model('Post',postsSchema);
module.exports = Post;
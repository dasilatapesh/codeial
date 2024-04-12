const Mongoose = require("mongoose");
const postsSchema = new Mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    user: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
},
{
    timestamps: true,
});

const Post = Mongoose.model('Post',postsSchema);
module.exports = Post;
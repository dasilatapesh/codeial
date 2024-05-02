const Mongoose = require('mongoose')

const commentSchema = new Mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    //comment belongs to a user
    user: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    //post will have comments
    post: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
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

const Comment = Mongoose.model('Comment',commentSchema);

module.exports = Comment;
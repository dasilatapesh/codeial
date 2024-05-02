const Mongoose = require('mongoose');

const likesSchema = new Mongoose.Schema({
    user:{
        type: Mongoose.Schema.Types.ObjectId,
    },
    likeable:{
        type: Mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    onModel:{
        type: String,
        required: true,
        enum: ['Post', 'Comment']
    }
},{
    timestamps: true,
});

const Likes = Mongoose.model('Likes', likesSchema);

module.exports = Likes;
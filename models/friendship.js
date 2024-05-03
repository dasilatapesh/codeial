const Mongoose = require('mongoose');

const friendshipSchema = new Mongoose.Schema({
    fromUser:{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    toUser: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
},{
    timestamps: true,
});

const Friendship = Mongoose.model('Friendship',friendshipSchema);

module.exports = Friendship;
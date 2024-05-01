const Mongoose = require('mongoose')

const passTokenSchema = new Mongoose.Schema({
    user: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    accessToken:{
        type: String,
        required: true,
    },
    isValid:{
        type: Boolean,
        default: true,
    }
},{
    timestamps: true,
});


const PassToken = Mongoose.model('PassToken',passTokenSchema);
module.exports = PassToken;
const mongoose = require("mongoose");

const Multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatar');
// E:\CodingNinjasMERN\Project1\codeial\uploads\users\avatar
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar:{
        type: String,
    }
},
{ timestamps: true});

const storage = Multer.diskStorage({
    destination: function(req, file, cb){
        console.log("Multer-",path.join(__dirname,'..',AVATAR_PATH));
        cb(null, path.join(__dirname,'..',AVATAR_PATH));
        
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now());
    }
});

userSchema.statics.uploadAvatar = Multer({storage: storage}).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model('User', userSchema);

module.exports = User;
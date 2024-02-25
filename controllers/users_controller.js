const userSchema = require("../models/user");

module.exports.profile = function(req, res){
    return res.render('profile', {
        title: "ProfileCodeial",
    });
}

module.exports.posts = function(req, res){
    return res.render('posts', {
        title: "Posts",
    });
}

module.exports.likes = function(req, res){
    return res.render('likes', {
        title: "Likes",
    });
}

//render signup page
module.exports.signup = function(req,res){
    return res.render('user_sign_up',{
        title: "Codeial||Sign Up"
    });
}

//render signin page
module.exports.signin = function(req,res){
    return res.render('user_sign_in',{
        title: "Codeial||Sign In"
    });
}

//get signup data
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect("back");
    }
    
    userSchema.findOne({email: req.body.email})
        .then(user => {
            if(!user){
                userSchema.create(req.body)
            }else {
                return Promise.reject("User already exists");
            }
        })
        .then(() => {
            return res.redirect("/users/sign-in");
        })
        .catch(err => {
            console.log("Error in creating user while Sign up:", err);
            return res.redirect("back");
        });
};

//sign-in and create a session for user
module.exports.createSession = function(req,res){
    //TODO later
}
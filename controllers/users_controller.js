const userSchema = require("../models/user");
const Posts = require("../models/posts.js");
module.exports.profile = function(req, res){
    return res.render('profile', {
        title: "ProfileCodeial",
    });
}

//show my post only
module.exports.showMyPosts = function(req,res){
    Posts.find({user: req.user._id})
   .then((posts)=>{
    return res.render('posts', {
        title: "Codial | Posts",
        posts: posts,
    });
   })
   .catch((err)=>{
       console.log("Error in creating post:", err);
       return res.redirect("back");
   });
}

module.exports.likes = function(req, res){
    return res.render('likes', {
        title: "Likes",
    });
}

//render signup page
module.exports.signup = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect("/users/profile");
    }

    return res.render('user_sign_up',{
        title: "Codeial||Sign Up"
    });
}

//render signin page
module.exports.signin = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect("/users/profile");
    }

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
    return res.redirect('/');
}

module.exports.destroySession = function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
});
}
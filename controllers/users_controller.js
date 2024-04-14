const userSchema = require("../models/user");
const Posts = require("../models/posts.js");
const User = require("../models/user.js");


module.exports.profile = function(req, res){
    User.findById(req.params.id)
    .then(user => {
        return res.render('profile', {
            title: "Codeial | Profile ",
            userProfile: user,
        });
    })
    .catch((err) => {
        console.log(err);
        return res.redirect('back');
    });
}

//update
module.exports.updateProfile = function(req,res){
    if(req.user.id==req.params.id){
        User.findOne({email: req.body.email})
        .then((user)=>{
            if(user && user.id!=req.user.id){
                return res.status(500).send('email already exist');
            }
            User.findByIdAndUpdate(req.params.id, req.body)
            .then(()=>{
                return res.redirect('back')
            })
            .catch((err)=>{
                console.log(err);
                return res.status(401).send('Some error',err);
            });
        })
        .catch((err)=>{
            console.log(err);
            return res.status(401).send('Some Error',err);
        });  
    }else {
        return res.status(401).send('Unauthorized');
    }
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
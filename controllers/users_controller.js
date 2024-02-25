const User = require("../models/user");
const userSchema = require("../models/user");

module.exports.profile = function(req, res){
    if(req.cookies.user_id){
        userSchema.findById(req.cookies.user_id)
            .then(user =>{
                if(user){
                    return res.render('profile',{
                        title: "User Profile",
                        user: user,
                    });
                }else{
                    return Promise.reject("User Not found")
                }
            })
            .catch(err => {
                console.log("Error: ",err);
            })
    }else {
        return res.redirect('/users/sign-in');
    }
}

module.exports.posts = function(req, res){
    if(req.cookies.user_id){
    userSchema.findById(req.cookies.user_id)
            .then(user =>{
                if(user){
                    return res.render('posts',{
                        title: "Posts",
                        userPost: ["Post A","Post B","Post C","Post D","Post E","Post F","Post G"]
                    });
                }else{
                    return Promise.reject("User Not found")
                }
            })
            .catch(err => {
                console.log("Error: ",err);
            })
    }else {
        return res.redirect('/users/sign-in');
    }
}

module.exports.likes = function(req, res){
    if(req.cookies.user_id){
        userSchema.findById(req.cookies.user_id)
                .then(user =>{
                    if(user){
                        return res.render('likes',{
                            title: "Posts",
                            likes: 30,
                        });
                    }else{
                        return Promise.reject("User Not found")
                    }
                })
                .catch(err => {
                    console.log("Error: ",err);
                })
        }else {
            return res.redirect('/users/sign-in');
        }
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
                return userSchema.create(req.body);
            }else {
                 return Promise.reject("User already exists");
                //console.log("User Already exists with userId: ",user._id);
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
    //steps to authenticate

    //find the user
    userSchema.findOne({email: req.body.email})
    //handle user found
        .then(user => {
            if(user){
                //if user found handle mismatching password which dont match
                if(user.password != req.body.password){
                    return Promise.reject("Password Mismatch");
                }else{
                    //handle session creation
                    res.cookie('user_id',user.id);
                    return res.redirect('/users/profile');
                }
                
            }else {
                //handle user not found
                return Promise.reject("User Not Found");
            }
        })
        .catch(err => {
            console.log("Error while Sign in: ",err);
            return res.redirect('back');
        })
}


//sign out

module.exports.clearCookieAndSignOut = function(req, res){
    if(req.cookies.user_id){
        res.clearCookie("user_id");
    }
    return res.redirect("/users/sign-in");
};
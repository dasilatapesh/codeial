const userSchema = require("../models/user");
const Posts = require("../models/posts.js");
const User = require("../models/user.js");
const PassToken = require("../models/passToken.js");
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const PassTokenMailer = require('../mailers/forgotPassMailer.js');

module.exports.profile = async function(req, res){
    try{
        const user = await User.findById(req.params.id);

        return res.render('profile', {
            title: "Codeial | Profile ",
            userProfile: user,
        });

    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
    // User.findById(req.params.id)
    // .then(user => {
    //     return res.render('profile', {
    //         title: "Codeial | Profile ",
    //         userProfile: user,
    //     });
    // })
    // .catch((err) => {
    //     console.log(err);
    //     return res.redirect('back');
    // });
}

//update
module.exports.updateProfile = async function(req,res){

    try{
        if(req.user.id==req.params.id){
            //to check if email already in database or not
            // console.log(req.body);
            // const userExists = await User.findOne({email: req.body.email});
            // if(userExists && userExists.id != req.user.id){
            //     console.log('Email present in database');
            //     return res.status(500).send('Email already exists');
            // }

            // const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body);
            const user = await User.findById(req.params.id);
            // console.log(User.avatarPath);
            User.uploadAvatar(req, res, async function(err){
                if(err){
                    console.log('********Multer Error*********',err);
                    return res.status(400).send(err);
                }
                // At this point, req.file contains the uploaded file
                // and req.body contains other form data

                // Check if email already exists
                const newEmail = req.body.email;
                const userExists = await User.findOne({email: newEmail});
                if(userExists && userExists.id != req.user.id) {
                    console.log('Email present in database');
                    return res.status(500).send('Email already exists');
                }
                console.log(req.body);
                // console.log(user);
                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){
                    if(user.avatar && user.avatar!='undefined/undefined'){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                    // console.log(req.file);
                    //saving path uploaded file in users avatar field
                    user.avatar = User.avatarPath+'/'+req.file.filename;
                }
                user.save();
                req.flash('success',"Profile Updated");
                return res.redirect('back');
            });
        }else{
            return res.status(401).send('Unauthorized');
        }
    }catch(err){
        console.log(err);
        return res.status(401).send('Some Error: '+err);
    }
    // if(req.user.id==req.params.id){
    //     User.findOne({email: req.body.email})
    //     .then((user)=>{
    //         if(user && user.id!=req.user.id){
    //             return res.status(500).send('email already exist');
    //         }
    //         User.findByIdAndUpdate(req.params.id, req.body)
    //         .then(()=>{
    //             return res.redirect('back')
    //         })
    //         .catch((err)=>{
    //             console.log(err);
    //             return res.status(401).send('Some error',err);
    //         });
    //     })
    //     .catch((err)=>{
    //         console.log(err);
    //         return res.status(401).send('Some Error',err);
    //     });  
    // }else {
    //     return res.status(401).send('Unauthorized');
    // }
}

//show my post only
module.exports.showMyPosts = async function(req,res){

    try{
        const posts = await Posts.find({user: req.user._id});
        return res.render('posts', {
            title: "Codial | Posts",
            posts: posts,
        });
    }catch(err){
        console.log("Error in creating post:", err);
        return res.redirect("back");
    }
//     Posts.find({user: req.user._id})
//    .then((posts)=>{
//     return res.render('posts', {
//         title: "Codial | Posts",
//         posts: posts,
//     });
//    })
//    .catch((err)=>{
//        console.log("Error in creating post:", err);
//        return res.redirect("back");
//    });
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
module.exports.create = async function(req,res){

    try{

        if(req.body.password != req.body.confirm_password){
            res.status(403).send('Password not match');
        }

        const user = await userSchema.findOne({email: req.body.email})

        if(!user){
            await userSchema.create(req.body)
        }else{
            return res.status(400).send('user already exists');
        }

        return res.redirect("/users/sign-in");
    }catch(err){
        console.log("Error in creating user while Sign up:", err);
        return res.redirect("back");
    }
    
    // userSchema.findOne({email: req.body.email})
    //     .then(user => {
    //         if(!user){
    //             userSchema.create(req.body)
    //         }else {
    //             return Promise.reject("User already exists");
    //         }
    //     })
    //     .then(() => {
    //         return res.redirect("/users/sign-in");
    //     })
    //     .catch(err => {
    //         console.log("Error in creating user while Sign up:", err);
    //         return res.redirect("back");
    //     });
};

//sign-in and create a session for user
module.exports.createSession = function(req,res){
    req.flash('success','Logged in successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res, next){

    req.logout(function(err) {
      if (err) { return next(err); }
      req.flash('success','Logged out successfully');
        res.redirect('/');
    });
}

module.exports.renderForgotPass = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect("/users/profile");
    }
    return res.render('forgot_pass',{
        title: "Forgot Password"
    });
}

module.exports.sendEmail = async function(req, res){
    try {
        console.log('req.body.email-> ',req.body.email);
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(400).send('Invalid Email Id');
        }
        const userInPassToken = await PassToken.findOne({user: user});
        const accessToken = crypto.randomBytes(50).toString('hex');
        console.log('accessToken -> ',accessToken);
        let createPassToken = "";
        if(!userInPassToken){
            createPassToken = await PassToken.create({
            user: user,
            accessToken: accessToken,
        });
        }else{
            createPassToken = await PassToken.findOneAndUpdate(
                { user: user },
                { accessToken: accessToken, isValid: true },
                { new: true } // This option returns the updated document
            );
        }

        createPassToken = await createPassToken.populate('user', 'email name');
        console.log('createPassTOken -> ',createPassToken);
        PassTokenMailer.resetPass(createPassToken);
        req.flash('success',"Email sent succesfully!");
        return res.redirect('/users/sign-in');
    } catch (error) {
        console.log(error);
        if(error){
            return res.status(500).send('Internal Server Error');
        }
    }
}

module.exports.changePassForm = async function(req, res){
    try {
        const accessToken = req.query.accessToken;
        //check if accessToken provided or not
        if (!accessToken) {
            return res.status(400).send('Access token is missing');
        }
        // Implement logic to validate accessToken (e.g., check if it exists in the database)
        let passToken = await PassToken.findOne({ accessToken: accessToken });

        if (!passToken || !passToken.isValid) {
            return res.status(401).send('Link Expired');
        }

        passToken = await passToken.populate('user', 'name email');

        // console.log(passToken);

        return res.render('reset_password',{
            title: 'Reset-Password',
            passToken: passToken,
        });

    } catch (error) {
        console.log(error);
        if(error){
            return res.status(500).send('Internal Server Error');
        }
    }
}


module.exports.changeAndResetPass = async function(req, res){
    try {
        const accessToken = req.query.accessToken;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;

        if(password !== confirmPassword){
            req.flash('error',"Password Mismatch Re-try!");
            return res.redirect('back');
        }

        const passToken = await PassToken.findOne({accessToken: accessToken});

        if(!passToken.isValid){
            req.flash('error', "Invalid accessToken");
            return res.redirect('/users/sign-in');
        }

        const user = passToken.user;

        const updatedUser = await User.findOneAndUpdate(user,{password:password},{new:true});

        const updatedPassToken = await PassToken.findOneAndUpdate(passToken, {isValid: false}, {new:true});

        console.log(updatedPassToken);

        req.flash('success',"Password Updated");

        return res.redirect('/users/sign-in');        
    } catch (error) {
        console.log(error);
        if(error){
            return res.status(500).send('Internal Server Error');
        }
    }
};
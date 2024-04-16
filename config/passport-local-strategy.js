const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');
//authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true,
    },
    function(req,email, password, done) {
        //find a user and establish the identitiy
        User.findOne({email: email})
            .then(user => {
                if(!user || user.password != password){
                    req.flash('error','Invalid Username/Password');
                    return done(null, false);
                }
                return done(null, user);
            })
            .catch(err => {
                // console.log('Error in finding user ----> Passport', err);
                req.flash('error',err);
                return done(err);
            })
}));


//serializing the user to decide which keys to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});


//deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id)
        .then(user => {
            return done(null, user);
        })
        .catch(err => {
            console.log('Error finding user: ',err);
            return done(err);
        })
    });

//check if the user is authenticated
passport.checkAuthentication =  function(req, res, next){
    //if user is signed in pass the req to next  function (controllers action)
    if(req.isAuthenticated()){
        return next();
    }
    //if user not signed in
    return res.redirect('/users/sign-in');

};

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from session cookie and we are sending this to local for views
        res.locals.user = req.user;
    }
    next();
};
module.exports = passport;

//
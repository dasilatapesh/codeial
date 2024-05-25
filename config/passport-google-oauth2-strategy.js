const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env = require('../config/environment');
const options = {
    clientID: env.clientID,
    clientSecret: env.clientSecret,
    callbackURL: env.google_call_backURL,
    };
//tell passport to use a new stategy for google login
passport.use(new googleStrategy(options , async function(accessToken, refreshToken, profile, done){
        try {
            //find user
            let user = await User.findOne({email: profile.emails[0].value});
            console.log(profile);
            if(user){
                //if found set this user to req.user
                return done(null, user);
            }else{
                //if not found create user and set it to req.user
                user = await User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    avatar: profile.photos[0].value,
                    password: crypto.randomBytes(20).toString('hex'),
                });

                return done(null, user);

            }
        } catch (error) {
            console.log(error);
            return done(error); // Pass error to done callback
        }
        
    }));
    
    module.exports = passport;
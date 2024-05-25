const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt; //used to extract JWT from header
const env = require('../config/environment');
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //header is key value pair --> key authorization key value pair --> have key Bearer --> have JWT
    secretOrKey: env.jwt_secret, // encryption / decryption key
};

const User = require('../models/user');

passport.use(new JwtStrategy(options, async function(jwtPayload, done ){ //done is a callback function
    //find user based on payload
    try {
        const user = await User.findById(jwtPayload._id);
        if(user){
            return done(null, user);
        }else{
            return done(null, false);
        }
    } catch (error) {
        console.log(error);
        return done(error, false);
    }
}));

module.exports = passport;
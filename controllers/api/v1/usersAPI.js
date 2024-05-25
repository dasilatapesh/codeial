const User = require('../../../models/user');
const jsonWebTOken = require('jsonwebtoken');
const env = require('../../../config/environment');
module.exports.createSession = async function(req,res){
    try {
        const user = await User.findOne({email: req.body.email});
        console.log(user);
        if(!user || req.body.password != user.password){
            return res.status(422).json({
                message: 'Unauthorized to access. Sign-in to access this page.',
            });
        }
        return res.status(200).json({
            message: 'Sign-in successful. Your token is: ',
            data:{
                token: jsonWebTOken.sign(
                    user.toJSON(),
                    env.jwt_secret,
                    {expiresIn: '100000'}
                ),
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal Server Error!',
            err,
        });
    }
}
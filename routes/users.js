const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/users_controller')

router.get('/profile/:id', passport.checkAuthentication,userController.profile);
router.post('/update/:id', passport.checkAuthentication,userController.updateProfile);

router.get('/posts', passport.checkAuthentication,userController.showMyPosts);

router.get('/likes', passport.checkAuthentication,userController.likes);

router.get('/sign-up',userController.signup);

router.get('/sign-in',userController.signin);

router.post('/create', userController.create);

router.get('/forgot-password', userController.renderForgotPass);

router.post('/send-email', userController.sendEmail);

router
.route('/reset-password/')
.get(userController.changePassForm)
.post(userController.changeAndResetPass);

//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local', //strategy
    {
        failureRedirect: '/users/sign-in'
        //successRedirect: '/users/profile',
    }
    //on failure
), userController.createSession);


router.get('/sign-out', userController.destroySession);

router.get('/auth/google', passport.authenticate('google',{scope: ['profile', 'email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}), userController.createSession);
module.exports = router;
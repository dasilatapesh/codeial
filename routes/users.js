const express = require('express');

const router = express.Router();

const userController = require('../controllers/users_controller')

router.get('/profile', userController.profile);

router.get('/posts', userController.posts);

router.get('/likes', userController.likes);

router.get('/sign-up',userController.signup);

router.get('/sign-in',userController.signin);

router.post('/create', userController.create);

router.post('/create-session',userController.createSession);

router.get('/sign-out', userController.clearCookieAndSignOut);
module.exports = router;
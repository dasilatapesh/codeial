const express = require('express'); //same instance of express as in index in main
const router = express.Router();
const passport = require('passport');

const {
    getPosts,
    destroyPosts,
} = require('../../../controllers/api/v1/postAPI');

router.get('/getPosts', getPosts);
router.delete('/delete/:id', passport.authenticate('jwt',{session: false}),destroyPosts);

module.exports = router;
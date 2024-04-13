const express = require('express');
const router = express.Router();
const passport = require('passport');

const {
    createPost,
    showMyPosts
} = require("../controllers/postsController");

router.post('/create',passport.checkAuthentication, createPost);

module.exports = router;
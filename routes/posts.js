const express = require('express');
const router = express.Router();
const passport = require('passport');

const {
    createPost,
} = require("../controllers/postsController");

router.post('/create',passport.checkAuthentication, createPost);

module.exports = router;
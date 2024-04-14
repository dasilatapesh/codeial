const express = require('express');
const router = express.Router();
const passport = require('passport');

const {
    createPost,
    deletePost
} = require("../controllers/postsController");

router.post('/create',passport.checkAuthentication, createPost);
router.get('/destroy/:id',passport.checkAuthentication, deletePost);

module.exports = router;
const express = require('express'); //same instance of express as in index in main
const router = express.Router();

const {
    getPosts,
    destroyPosts,
} = require('../../../controllers/api/v1/postAPI');

router.use('/getPosts', getPosts);
router.use('/delete/:id',destroyPosts);

module.exports = router;
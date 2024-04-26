const express = require('express'); //same instance of express as in index in main

const router = express.Router();

router.use('/posts', require('./post'));

module.exports = router;
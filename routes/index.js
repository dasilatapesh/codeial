const express = require('express'); //same instance of express as in index in main

const router = express.Router();
const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comment'));
//for API
router.use('/api', require('./api'));
// for any further routes, access from here
// router.use('/routerName', require('./routerFile'));

module.exports = router;
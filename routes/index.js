const express = require('express'); //same instance of express as in index in main

const router = express.Router();
const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);
module.exports = router;
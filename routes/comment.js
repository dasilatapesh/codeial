const express = require('express');
const router = express.Router();
const passport = require('passport');

const {
    create,
    deleteComment
} = require('../controllers/commentController');

router.post('/create', passport.checkAuthentication, create);
router.get('/destroy/:id',passport.checkAuthentication, deleteComment);

module.exports = router;
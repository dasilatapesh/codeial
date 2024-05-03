const express = require('express');
const router = express.Router();

const {toggleFriend,
    checkFriendshipStatus
} = require('../controllers/toggleFriendship');

router.post('/togglefriend/:id',toggleFriend);

router.get('/checkFriendshipStatus/:id',checkFriendshipStatus);

module.exports = router;
const express = require('express'); //same instance of express as in index in main
const router = express.Router();

const {
    createSession,
} = require('../../../controllers/api/v1/usersAPI');

router.post('/create-session', createSession);

module.exports = router;
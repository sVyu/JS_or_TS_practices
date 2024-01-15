const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middlewares');
const { follow } = require('../controllers/user');

router.post('/:id/follow', isLoggedIn, follow);
// router.post('/:id/unfollow', isLoggedIn, follow);

module.exports = router;
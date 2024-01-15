const express = require('express');
const { verifyToken, deprecated } = require("../middlewares");
const { createToken, tokenTest, getMyPosts, getPostsByHashtag } = require('../controllers/v1');

const router = express.Router();

// 모든 라우터 공통으로 적용되는 것
// 중복 줄이기
router.use(deprecated);

// /v1/token
router.post('/token', createToken);
router.get('/test', verifyToken, tokenTest);

router.get('/posts/my', verifyToken, getMyPosts);
router.get('/posts/hashtag/:title', verifyToken, getPostsByHashtag);

module.exports = router;
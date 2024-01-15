const express = require('express');
const { verifyToken, apiLimiter, corsWhenDomainMatches } = require("../middlewares");
const { createToken, tokenTest, getMyPosts, getPostsByHashtag } = require('../controllers/v2');
const cors = require('cors');

const router = express.Router();

// router.use(cors({
//     origin: true, // 모든 요청을 받는다
//     // origin: 'http://localhost:4000',    // 고정
//     credentials: true,                  // 쿠키 요청까지 받는 경우
// }))
// 사용자마다 다르게 처리할 필요가 있다

router.use(corsWhenDomainMatches);

// /v1/token
router.post('/token', apiLimiter, createToken);
router.get('/test', verifyToken, apiLimiter, tokenTest);

router.get('/posts/my', verifyToken, apiLimiter, getMyPosts);
router.get('/posts/hashtag/:title', verifyToken, apiLimiter, getPostsByHashtag);

module.exports = router;
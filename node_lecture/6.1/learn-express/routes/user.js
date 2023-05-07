const express = require('express');
const router = express.Router();

// GET /라우터
// /user/
router.get('/', (req, res)=>{
    res.send('Hello, Uuser');
});

module.exports = router;
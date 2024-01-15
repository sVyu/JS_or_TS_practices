const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const { Domain } = require('../models');
const User = require('../models/user');

exports.isLoggedIn = (req, res, next) => {
    // console.log("isLoggedIn", req)
    if (req.isAuthenticated()) {   // 패스포트 통해서 로그인 check
        next();
    } else {
        // req.status(403).send('로그인 필요');
        res.status(403).send('로그인 필요');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    // console.log("isNotLoggedIn", req)
    if (!req.isAuthenticated()) {
        next();
    } else {
        const message = encodeURIComponent('로그인한 상태입니다.');
        res.redirect(`/?error=${message}`); // localhost:8001?error=메시지
    }
};

exports.verifyToken = (req, res, next) => {
    try {
        res.locals.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        return next();  // 다음 미들웨어로 넘어가기
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            res.status(419).json({
                code: 419,
                messsage: '토큰이 만료되었습니다.',
            })
        }
        return res.status(401).json({
            code: 401,
            messsage: '유효하지 않은 토큰입니다.',
        })
    }
}

// exports.apiLimiter = rateLimit({
//     windowMs: 60 * 1000,
//     max: 5,
//     handler(req, res){
//         res.status(this.statusCode).json({
//             code: this.statusCode,
//             message: '1분에 한 번만 요청할 수 있습니다.',
//         });
//     }
// })

exports.apiLimiter = async (req, res, next) => {
    let user;
    if (res.locals?.decode?.id) {
        user = await User.findOne({ where: { id: res.locals.decode.id } });
    }

    rateLimit({
        windowMs: 60 * 1000,
        max: user?.type === 'premium' ? 1000 : 5,
        handler(req, res) {
            res.status(this.statusCode).json({
                code: this.statusCode,
                message: '1분에 한 번만 요청할 수 있습니다.',
            });
        }
    })(req, res, next);
}

exports.deprecated = (req, res) => {
    res.status(410).json({
        code: 410,
        message: '새로운 버전이 나왔습니다. 새로운 버전을 사용하세요',
    })
}

exports.corsWhenDomainMatches = async (req, res, next) => {
    // domain이 일치하는 경우에는 CORS가 적용되고 아니면 next();
    const domain = await Domain.findOne({
        where: { host: new URL(req.get('origin').host) }
    })

    if (domain) {
        cors({
            origin: req.get('origin'),
            credentials: true,
        })(req, res, next);
    } else {
        next();
    }
};
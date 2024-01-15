"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNotLoggedIn = exports.isLoggedIn = void 0;
const isLoggedIn = (req, res, next) => {
    console.log("isLoggedIn", req);
    if (req.isAuthenticated()) { // 패스포트 통해서 로그인 check
        next();
    }
    else {
        res.status(403).send('로그인 필요');
    }
};
exports.isLoggedIn = isLoggedIn;
const isNotLoggedIn = (req, res, next) => {
    console.log("isNotLoggedIn", req);
    if (!req.isAuthenticated()) {
        next();
    }
    else {
        const message = encodeURIComponent('로그인한 상태입니다.');
        res.redirect(`/?error=${message}`); // localhost:8001?error=메시지
    }
};
exports.isNotLoggedIn = isNotLoggedIn;

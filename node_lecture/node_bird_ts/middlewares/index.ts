// import { Request, Response, NextFunction } from 'express';
import { RequestHandler } from "express";

const isLoggedIn: RequestHandler = (req, res, next) => {
    console.log("isLoggedIn", req)
    if (req.isAuthenticated()) {   // 패스포트 통해서 로그인 check
        next();
    } else {
        res.status(403).send('로그인 필요');
    }
};

const isNotLoggedIn: RequestHandler = (req, res, next) => {
    console.log("isNotLoggedIn", req)
    if (!req.isAuthenticated()) {
        next();
    } else {
        const message = encodeURIComponent('로그인한 상태입니다.');
        res.redirect(`/?error=${message}`); // localhost:8001?error=메시지
    }
};

export { isLoggedIn, isNotLoggedIn };
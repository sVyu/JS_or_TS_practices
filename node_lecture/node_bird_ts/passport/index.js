"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const localStrategy_1 = __importDefault(require("./localStrategy"));
// import kakao from './kakaoStrategy';
const user_1 = __importDefault(require("../models/user"));
exports.default = () => {
    passport_1.default.serializeUser((user, done) => {
        done(null, user.id); // user id만 추출
    });
    // 세션 { 12390123412  : 1	}
    //      { 세션쿠키 : 유저아이디 } → 메모리에 저장
    passport_1.default.deserializeUser((id, done) => {
        // id를 가지고 유저 정보를 복원
        user_1.default.findOne({
            where: { id },
            include: [
                {
                    model: user_1.default,
                    attributes: ['id', 'nick'],
                    as: 'Followers',
                },
                {
                    model: user_1.default,
                    attributes: ['id', 'nick'],
                    as: 'Followings',
                }, // 팔로워
            ]
        })
            .then((user) => done(null, user)) // req.user, req.session
            .catch(err => done(err));
    });
    (0, localStrategy_1.default)();
};

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderHashtag = exports.renderMain = exports.renderJoin = exports.renderProfile = void 0;
const post_1 = __importDefault(require("../models/post"));
const user_1 = __importDefault(require("../models/user"));
const hashtag_1 = __importDefault(require("../models/hashtag"));
const renderProfile = (req, res, next) => {
    // 서비스를 호출
    res.render('profile', { title: '내 정보 - NodeBird' });
};
exports.renderProfile = renderProfile;
const renderJoin = (req, res, next) => {
    res.render('join', { title: '회원 가입 - NodeBird' });
};
exports.renderJoin = renderJoin;
const renderMain = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield post_1.default.findAll({
            include: {
                model: user_1.default,
                attributes: ['id', 'nick'],
                // attributes: ['id', 'nick', 'password'], 비밀번호가 front에 보이면 안 되므로 위 코드로 처리
            },
            order: [['createdAt', 'DESC']],
        });
        res.render('main', {
            title: 'NodeBird',
            twits: posts,
        });
    }
    catch (error) {
        // console.error(error);
        next(error);
    }
});
exports.renderMain = renderMain;
const renderHashtag = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query.hashtag;
    if (!query) {
        return res.redirect('/');
    }
    try {
        const hashtag = yield hashtag_1.default.findOne({ where: { title: query } });
        let posts = [];
        if (hashtag) {
            posts = yield hashtag.getPosts({
                include: [{ model: user_1.default, attributes: ['id', 'nick'] }],
                order: [['createdAt', 'DESC']]
            });
        }
        res.render('main', {
            title: `${query} | NodeBird`,
            twits: posts,
        });
    }
    catch (error) {
        // console.log(error)
        next(error);
    }
});
exports.renderHashtag = renderHashtag;

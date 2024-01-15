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
exports.join = exports.login = exports.logout = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const passport_1 = __importDefault(require("passport"));
// exports.join = async (req, res, next) => {
const join = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { nick, email, password } = req.body;
    try {
        const exUser = yield user_1.default.findOne({ where: { email } });
        if (exUser) {
            return res.redirect('/join?error=exist');
        }
        const hash = yield bcrypt_1.default.hash(password, 12);
        yield user_1.default.create({
            email,
            nick,
            password: hash,
        });
        return res.redirect('/'); // 302
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.join = join;
// POST /auth/login
const login = (req, res, next) => {
    passport_1.default.authenticate('local', (authError, user, info) => {
        if (authError) { // 서버 실패
            // 서버에서 문제가 생겼을 경우는 에러 로깅해주고
            // next로 넘겨버리면 된다 → error 처리 미들웨어에서 알아서 하도록
            console.error(authError);
            return next(authError);
        }
        if (!user) { // 로직 실패
            return res.redirect(`/?loginError=${info.message}`);
        }
        return req.login(user, (loginError) => {
            // 로그인 과정에서도 에러가 발생가능
            // 제로초 선생님은 8년 동안 해보면서 여기서 에러 발생한 적은 없지만 만약을 대비한 안전장치
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
        // 미들웨어 확장 패턴
    })(req, res, next);
};
exports.login = login;
// exports.logout = (req, res, next) => {
const logout = (req, res) => {
    // 세션에 들어있던 세션 쿠키랑 user.id의 연결을 없앤다
    // {} 브라우저의 connect.sid가 남아있어도 세션 쿠키가 비어있어서 연결 안 됨
    req.logout(() => {
        res.redirect('/');
    });
};
exports.logout = logout;

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
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
exports.default = () => {
    passport_1.default.use(new passport_local_1.Strategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: false // 다음 함수인자로 req도 받을지
    }, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
        // 로그인을 해도 되는지 안 되는지 판단
        try {
            const exUser = yield user_1.default.findOne({ where: { email } });
            if (exUser) {
                // 사용자의 pw랑 db의 pw가 같은지 비교
                // const result = await bcrypt.compare(password, exUser.password)
                const result = yield bcrypt_1.default.compare(password, exUser.password);
                if (result) {
                    // 성공
                    done(null, exUser);
                }
                else {
                    // 서버의 error도 없는데 login을 시켜주면 안 되는 경우, 이유를 적어준다
                    done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
                }
            }
            else {
                done(null, false, { message: '가입되지 않은 회원입니다.' });
            }
        }
        catch (error) {
            // console.error(error);
            done(error);
        }
    })));
};

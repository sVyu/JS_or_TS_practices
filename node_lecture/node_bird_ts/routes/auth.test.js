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
const supertest_1 = __importDefault(require("supertest"));
const models_1 = require("../models");
const app_1 = __importDefault(require("../app"));
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.sequelize.sync();
}));
describe('POST /join', () => {
    test('로그인 안 했으면 가입', (done) => {
        (0, supertest_1.default)(app_1.default)
            .post('/auth/join')
            .send({
            email: 'zerohch0@gmail.com',
            nick: 'zerocho',
            password: 'nodejsbook',
        })
            .expect('Location', '/')
            .expect(302, done);
    });
});
describe('POST /join', () => {
    const agent = supertest_1.default.agent(app_1.default);
    beforeEach((done) => {
        agent
            .post('/auth/login')
            .send({
            email: 'zerohch0@gmail.com',
            password: 'nodejsbook',
        })
            .end(done);
    });
    test('이미 로그인했으면 redirect /', (done) => {
        const message = encodeURIComponent('로그인한 상태입니다.');
        agent
            .post('/auth/join')
            .send({
            email: 'zerohch0@gmail.com',
            nick: 'zerocho',
            password: 'nodejsbook',
        })
            .expect('Location', `/?error=${message}`)
            .expect(302, done);
    });
});
describe('POST /login', () => {
    test('가입되지 않은 회원', (done) => {
        const message = encodeURIComponent('가입되지 않은 회원입니다.');
        (0, supertest_1.default)(app_1.default)
            .post('/auth/login')
            .send({
            email: 'zerohch1@gmail.com',
            password: 'nodejsbook',
        })
            .expect('Location', `/?loginError=${message}`)
            .expect(302, done);
    });
    test('로그인 수행', (done) => {
        (0, supertest_1.default)(app_1.default)
            .post('/auth/login')
            .send({
            email: 'zerohch0@gmail.com',
            password: 'nodejsbook',
        })
            .expect('Location', '/')
            .expect(302, done);
    });
    test('비밀번호 틀림', (done) => {
        const message = encodeURIComponent('비밀번호가 일치하지 않습니다.');
        (0, supertest_1.default)(app_1.default)
            .post('/auth/login')
            .send({
            email: 'zerohch0@gmail.com',
            password: 'wrong',
        })
            .expect('Location', `/?loginError=${message}`)
            .expect(302, done);
    });
});
describe('GET /logout', () => {
    test('로그인 되어있지 않으면 403', (done) => {
        (0, supertest_1.default)(app_1.default)
            .get('/auth/logout')
            .expect(403, done);
    });
    const agent = supertest_1.default.agent(app_1.default);
    beforeEach((done) => {
        agent
            .post('/auth/login')
            .send({
            email: 'zerohch0@gmail.com',
            password: 'nodejsbook',
        })
            .end(done);
    });
    test('로그아웃 수행', (done) => {
        agent
            .get('/auth/logout')
            .expect('Location', `/`)
            .expect(302, done);
    });
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.sequelize.sync({ force: true });
}));

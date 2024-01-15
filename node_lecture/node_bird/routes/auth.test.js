const app = require('../app');
const request = require('supertest');
const { sequelize } = require('../models');

// beforeAll : 모든 테스트를 시행하기 전 딱 한 번만 실행
// DB 연결
beforeAll(async () => {
    // force:true → DB를 전부 리셋한다
    await sequelize.sync({ force: true });
})

// 각각의 테스트 시작 전
beforeEach(() => { });

describe('POST /join', () => {
    test('로그인 안 했으면 가입', (done) => {
        request(app).post('/auth/join')
            .send({
                email: 'abcdef@naver.com',
                nick: 'abcdef',
                password: 'abcdef',
            })
            .expect('Location', '/')
            .expect(302, done)
    });
    test('회원가입 이미 했는데 또 하는 경우', (done) => {
        request(app).post('/auth/join')
            .send({
                email: 'abcdef@naver.com',
                nick: 'abcdef',
                password: 'abcdef',
            })
            .expect('Location', '/join?error=exist')
            .expect(302, done)
    });
})

describe('POST /join', () => {
    const agent = request.agent(app);
    beforeEach((done) => {
        // 로그인
        agent
            .post('/auth/login')
            .send({
                email: 'abcdef@naver.com',
                password: 'abcdef',
            })
            .end(done)
    });
    test('로그인했으면 회원가입 진행이 안 되어야 함', (done) => {
        const message = encodeURIComponent('로그인한 상태입니다.');
        agent.post('/auth/join')
            .send({
                email: 'abcdef@naver.com',
                nick: 'abcdef',
                password: 'abcdef',
            })
            .expect('Location', `/?error=${message}`)
            .expect(302, done)
    });
});


describe('POST /login', () => {
    test('로그인 수행', (done) => {
        request(app).post('/auth/login')
            .send({
                email: 'abcdef@naver.com',
                password: 'abcdef',
            })
            .expect('Location', '/')
            .expect(302, done)
        // done(); // request는 비동기 함수, done()을 호출하면 이 test가 끝났다는 걸 jest가 알아차린다
    });
    test('가입되지 않은 회원', (done) => {
        const message = '가입되지 않은 회원입니다.';
        request(app).post('/auth/login')
            .send({
                email: 'abcdef11@naver.com',
                password: 'abcdef',
            })
            .expect('Location', `/?loginError=${encodeURIComponent(message)}`)
            .expect(302, done)
        // done(); // request는 비동기 함수, done()을 호출하면 이 test가 끝났다는 걸 jest가 알아차린다
    });
    test('비밀번호 틀림', (done) => {
        const message = '비밀번호가 일치하지 않습니다.'
        request(app).post('/auth/login')
            .send({
                email: 'abcdef@naver.com',
                password: 'abcdef11',
            })
            .expect('Location', `/?loginError=${encodeURIComponent(message)}`)
            .expect(302, done)
        // done(); // request는 비동기 함수, done()을 호출하면 이 test가 끝났다는 걸 jest가 알아차린다
    });
})

describe('GET /logout', () => {
    test('로그인 되어있지 않으면 403', (done) => {
        request(app)
            .get('/auth/logout')
            .expect(403, done);
    });

    const agent = request.agent(app);
    beforeEach((done) => {
        agent
            .post('/auth/login')
            .send({
                email: 'abcdef@naver.com',
                password: 'abcdef',
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

// 각각의 테스트가 끝나고 난 후
afterEach(() => { });

// 모든 테스트가 끝나고 난 후
afterAll(async () => {
    await sequelize.sync({ force: true });
});
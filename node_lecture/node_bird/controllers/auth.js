const User = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');

exports.join = async (req, res, next) => {
    const { nick, email, password } = req.body;
    try {
        const exUser = await User.findOne({ where: { email } });
        if (exUser) {
            return res.redirect('/join?error=exist');
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            email,
            nick,
            password: hash,
        })
        return res.redirect('/');   // 302
    } catch (error) {
        console.error(error);
        next(error);
    }
}
// POST /auth/login
exports.login = (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {     // 서버 실패
            // 서버에서 문제가 생겼을 경우는 에러 로깅해주고
            // next로 넘겨버리면 된다 → error 처리 미들웨어에서 알아서 하도록
            console.error(authError);
            return next(authError);
        }
        if (!user) {        // 로직 실패
            return res.redirect(`/?loginError=${info.message}`)
        }
        return req.login(user, (loginError) => {  // 로그인 성공
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

// exports.logout = (req, res, next) => {
exports.logout = (req, res) => {
    // 세션에 들어있던 세션 쿠키랑 user.id의 연결을 없앤다
    // {} 브라우저의 connect.sid가 남아있어도 세션 쿠키가 비어있어서 연결 안 됨
    req.logout(() => {
        res.redirect('/');
    })
}
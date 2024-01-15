const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email',     // req.body.email
        passwordField: 'password',  // req.body.password
        passReqToCallback: false     // 다음 함수인자로 req도 받을지
    }, async (email, password, done) => {   // done{서버실패, 성공유저, 로직실패}
        // 로그인을 해도 되는지 안 되는지 판단
        try {
            const exUser = await User.findOne({ where: { email } })
            if (exUser) {
                // 사용자의 pw랑 db의 pw가 같은지 비교
                const result = await bcrypt.compare(password, exUser.password)
                if (result) {
                    // 성공
                    done(null, exUser);
                } else {
                    // 서버의 error도 없는데 login을 시켜주면 안 되는 경우, 이유를 적어준다
                    done(null, false, { message: '비밀번호가 일치하지 않습니다.' })
                }
            } else {
                done(null, false, { message: '가입되지 않은 회원입니다.' })
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};
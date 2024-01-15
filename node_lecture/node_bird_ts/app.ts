import express, { ErrorRequestHandler } from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import session from 'express-session';
import nunjucks from 'nunjucks';
import dotenv from 'dotenv';
import passport from 'passport';
import { sequelize } from './models';

dotenv.config();    // process.env 에 값을 넣음
import pageRouter from './routes/page';    // 페이지 라우팅
import authRouter from './routes/auth';
import postRouter from './routes/post';
import userRouter from './routes/user';
import passportConfig from './passport';

const app = express();
passportConfig();   // 패스포트 설정
app.set('port', process.env.PORT || 8001);
app.set('view engine', 'html');             // 페이지 확장자 : html
nunjucks.configure('views', {               // nunjucks를 이용해서 화면 구성
    express: app,
    watch: true,
});

sequelize.sync({ force: false })
    .then(() => {
        console.log('DB 연결 성공')
    })
    .catch((err) => {
        console.error(err);
    })

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // req.body 폼으로부터
app.use(cookieParser(process.env.COOKIE_SECRET)); // { connect.sid=1231293812093 }
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET!,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));
app.use(passport.initialize()); // req.user, req.login, req.isAuthenticate, req.logout
app.use(passport.session());    // connect.sid라는 이름으로 세션 쿠키가 브라우저로 접속 -> 로그인 완료
// 브라우저 connect.sid=1231293812093

app.use('/', pageRouter);
app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
})

const errorHandler:ErrorRequestHandler = (err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
};
app.use(errorHandler);

// module.exports = app;
export default app;
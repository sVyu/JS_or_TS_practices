"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const express_session_1 = __importDefault(require("express-session"));
const nunjucks_1 = __importDefault(require("nunjucks"));
const dotenv_1 = __importDefault(require("dotenv"));
const passport_1 = __importDefault(require("passport"));
const models_1 = require("./models");
dotenv_1.default.config(); // process.env 에 값을 넣음
const page_1 = __importDefault(require("./routes/page")); // 페이지 라우팅
const auth_1 = __importDefault(require("./routes/auth"));
const post_1 = __importDefault(require("./routes/post"));
const user_1 = __importDefault(require("./routes/user"));
const passport_2 = __importDefault(require("./passport"));
const app = (0, express_1.default)();
(0, passport_2.default)(); // 패스포트 설정
app.set('port', process.env.PORT || 8001);
app.set('view engine', 'html'); // 페이지 확장자 : html
nunjucks_1.default.configure('views', {
    express: app,
    watch: true,
});
models_1.sequelize.sync({ force: false })
    .then(() => {
    console.log('DB 연결 성공');
})
    .catch((err) => {
    console.error(err);
});
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/img', express_1.default.static(path_1.default.join(__dirname, 'uploads')));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false })); // req.body 폼으로부터
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET)); // { connect.sid=1231293812093 }
app.use((0, express_session_1.default)({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));
app.use(passport_1.default.initialize()); // req.user, req.login, req.isAuthenticate, req.logout
app.use(passport_1.default.session()); // connect.sid라는 이름으로 세션 쿠키가 브라우저로 접속 -> 로그인 완료
// 브라우저 connect.sid=1231293812093
app.use('/', page_1.default);
app.use('/auth', auth_1.default);
app.use('/post', post_1.default);
app.use('/user', user_1.default);
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});
const errorHandler = (err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
};
app.use(errorHandler);
// module.exports = app;
exports.default = app;

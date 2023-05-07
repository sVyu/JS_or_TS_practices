const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');

dotenv.config();
const indexRouter = require('./routes');
const userRouter = require('./routes/user');
const app = express();

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
// app.use(morgan('combined'));
app.use('/', (req, res, next) => {
    if (req.session.id) {
        express.static(__dirname, 'public')(req, res, next);
    } else {
        next();
    }
});

app.use(cookieParser(process.env.COOKIE_SECRET));
// app.use(session());
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
    },
    // name: 'connet.sid',
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/user', userRouter);

app.use((req, res, next) => {
    // console.log('모든 요청에 실행하고 싶어요');
    // next();
    req.data = 'test_data';
},
);

app.get('/', (req, res) => {
    req.data
    res.sendFile(path.join(__dirname, './index.html'));
});

app.post('/', (req, res) => {
    res.send('hello express (post)')
});

app.get('/about', (req, res) => {
    res.send('hello express (about)');
});

app.get('/category/:name', (req, res) => {
    // res.send(`hello ${req.params.name}`);
    res.send(`hello wildcard`);
});

// 404 처리 미들웨어 (에러 처리 X)
app.use((req, res, next) => {
    res.send('404지롱');
});

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
    console.error(err);
    res.send('에러났지롱');
});

app.listen(app.get('port'), () => {
    console.log('express server executed');
});
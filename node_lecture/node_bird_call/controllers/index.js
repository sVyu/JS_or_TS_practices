const axios = require('axios');

const URL = process.env.API_URL;
axios.defaults.headers.origin = process.env.ORIGIN;

// 토큰 발급받고 만료됐으면 재발급받고 API 요청하고
const request = async (req, api) => {
    try {
        // 세션에 토큰이 없으면 발급받는다
        if (!req.session.jwt) {
            const tokenResult = await axios.post(`${URL}/token`, {
                clientSecret: process.env.CLIENT_SECRET,
            });
            req.session.jwt = tokenResult.data.token;
        }
        // 결과 return
        return await axios.get(`${URL}${api}`, {
            headers: { authorization: req.session.jwt },
        })
    } catch (err) {
        // 유효기간 만료된 경우, 세션에서 지워버리고 다시 호출
        if (err.response?.status === 419) {
            delete req.session.jwt;
            return request(req, api);
        }
        // 토큰 위조 or 서버 문제
        // throw err.response;
        return err.response;
    }
};

exports.getMyPosts = async (req, res, next) => {
    try {
        const result = await request(req, '/posts/my');
        res.json(result.data);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.searchByHashtag = async (req, res, next) => {
    try {
        const result = await request(req, `/posts/hashtag/${encodeURIComponent(req.params.hashtag)}`);
        res.json(result.data);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.renderMain = (req, res) => {
    res.render('main', { key: process.env.CLIENT_SECRET });
}
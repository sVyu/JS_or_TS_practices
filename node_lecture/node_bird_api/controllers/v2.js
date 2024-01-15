const jwt = require('jsonwebtoken');
const { Domain, User, Hashtag, Post } = require('../models');

exports.createToken = async (req, res) => {
    const { clientSecret } = req.body;
    try {
        const domain = await Domain.findOne({
            where: { clientSecret },
            include: {
                model: User,
                attribute: ['id', 'nick'],
            },
        });
        if (!domain) {
            return res.status(401).json({
                code: 401,
                message: '등록되지 않은 도메인입니다. 먼저 도메인을 등록하세요.',
            })
        }
        const token = jwt.sign({
            id: domain.User.id,
            nick: domain.User.nick,
        }, process.env.JWT_SECRET, {
            expiresIn: '30m',    // 30분
            issuer: 'nodebird',
        })
        return res.json({
            code: 200,
            mssage: '토큰 발급되었습니다',
            token,
        });
    } catch (error) {
        console.log(error);
        // next(error);
        // 응답이 없으면 브라우저는 하염 없이 기다리기 때문에 최소 1개의 응답
        return res.status(500).json({
            code: 500,
            message: '서버 에러',
        });
    }
}

exports.tokenTest = async (req, res) => {
    // 토큰 내용물을 다시 프론트로 돌려주는 간단한 코드
    res.json(res.locals.decoded);
}

exports.getMyPosts = (req, res) => {
    Post.findAll({ where: { userId: res.locals.decoded.id } })
        .then((posts) => {
            res.json({
                code: 200,
                payload: posts,
            })
        })
        .catch((error) => {
            return res.status(500).json({
                code: 500,
                message: '서버 에러2',
            })
        })
}

exports.getPostsByHashtag = async (req, res) => {
    try {
        const hashtag = await Hashtag.findOne({ where: { title: req.params.title } });
        if (!hashtag) {  // 검색한 해쉬태그가 없는 경우
            return res.status(404).json({
                code: 404,
                message: '검색 결과가 없습니다.',
            })
        }
        const posts = await hashtag.getPosts();
        if (posts.length === 0) {
            return res.status(404).json({
                code: 404,
                message: '검색 결과가 없습니다.',
            })
        }
        return res.json({
            code: 200,
            payload: posts,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            code: 500,
            message: '서버 에러',
        })
    }
}
import  Post from '../models/post';
import  User from '../models/user';
import  Hashtag from '../models/hashtag';
import { RequestHandler } from 'express';


const renderProfile:RequestHandler = (req, res, next) => {
    // 서비스를 호출
    res.render('profile', { title: '내 정보 - NodeBird' });
};
const renderJoin:RequestHandler = (req, res, next) => {
    res.render('join', { title: '회원 가입 - NodeBird' });
};
const renderMain:RequestHandler = async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            include: {
                model: User,
                attributes: ['id', 'nick'],
                // attributes: ['id', 'nick', 'password'], 비밀번호가 front에 보이면 안 되므로 위 코드로 처리
            },
            order: [['createdAt', 'DESC']],
        });
        res.render('main', {
            title: 'NodeBird',
            twits: posts,
        });
    } catch (error) {
        // console.error(error);
        next(error);
    }
};

const renderHashtag:RequestHandler = async (req, res, next) => {
    const query = req.query.hashtag as string;
    if (!query) {
        return res.redirect('/');
    }
    try {
        const hashtag = await Hashtag.findOne({ where: { title: query } });
        let posts: Post[] = [];
        if (hashtag) {
            posts = await hashtag.getPosts({
                include: [{ model: User, attributes: ['id', 'nick'] }],
                order: [['createdAt', 'DESC']]
            });
        }
        res.render('main', {
            title: `${query} | NodeBird`,
            twits: posts,
        }
        )
    } catch (error) {
        // console.log(error)
        next(error);
    }
}

export {renderProfile, renderJoin, renderMain, renderHashtag};
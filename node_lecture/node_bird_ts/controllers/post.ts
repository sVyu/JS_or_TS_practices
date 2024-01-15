import Post from '../models/post';
import Hashtag from '../models/hashtag';
import { RequestHandler } from 'express';

const afterUploadImage: RequestHandler = (req, res) => {
    // console.log(req.file);
    res.json({ url: `/img/${req.file?.filename}` })
}

const uploadPost: RequestHandler = async (req, res, next) => {
    // req.body.content, req.body.url
    try {
        const post = await Post.create({
            content: req.body.content,
            img: req.body.url,
            UserId: req.user?.id,
        });
        // await post.addUser(req.user.id);
        const hashtags: string[] = req.body.content.match(/#[^\s#]*/g);
        if (hashtags) {
            const result = await Promise.all(hashtags.map((tag) => {
                return Hashtag.findOrCreate({
                    where: { title: tag.slice(1).toLowerCase() },
                });
            }));
            // console.log('result', result);
            await post.addHashtags(result.map(r => r[0]));
        }
        res.redirect('/');
    } catch (error) {
        // console.error(error);
        next(error);
    }
}

export { afterUploadImage, uploadPost };
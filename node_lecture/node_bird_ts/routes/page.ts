import express from 'express';
import { renderJoin, renderMain, renderProfile, renderHashtag } from '../controllers/page';
import { isLoggedIn, isNotLoggedIn } from '../middlewares';

const router = express.Router();
router.use((req, res, next) => {
    // res.locals.user = null;
    res.locals.user = req.user;
    // await User.find();
    res.locals.followerCount = 0;
    res.locals.followerCount = req.user?.Followers?.length || 0;
    res.locals.followingCount = req.user?.Followings?.length || 0;
    res.locals.followingIdList = req.user?.Followings?.map(f => f.id) || [];
    next();
});

router.get('/profile', isLoggedIn, renderProfile);
router.get('/join', isNotLoggedIn, renderJoin);
router.get('/', renderMain);
router.get('/hashtag', renderHashtag); // Hashtag?hashtag=고양이

// module.exports = router;
export default router;

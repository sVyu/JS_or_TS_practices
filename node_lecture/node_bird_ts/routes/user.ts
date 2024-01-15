import express from 'express';
import { isLoggedIn } from '../middlewares';
import { follow } from '../controllers/user';
const router = express.Router();

router.post('/:id/follow', isLoggedIn, follow);
// router.post('/:id/unfollow', isLoggedIn, follow);

// module.exports = router;
export default router;
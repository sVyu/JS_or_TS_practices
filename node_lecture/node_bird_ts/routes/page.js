"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const page_1 = require("../controllers/page");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
router.use((req, res, next) => {
    var _a, _b, _c, _d, _e, _f;
    // res.locals.user = null;
    res.locals.user = req.user;
    // await User.find();
    res.locals.followerCount = 0;
    res.locals.followerCount = ((_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.Followers) === null || _b === void 0 ? void 0 : _b.length) || 0;
    res.locals.followingCount = ((_d = (_c = req.user) === null || _c === void 0 ? void 0 : _c.Followings) === null || _d === void 0 ? void 0 : _d.length) || 0;
    res.locals.followingIdList = ((_f = (_e = req.user) === null || _e === void 0 ? void 0 : _e.Followings) === null || _f === void 0 ? void 0 : _f.map(f => f.id)) || [];
    next();
});
router.get('/profile', middlewares_1.isLoggedIn, page_1.renderProfile);
router.get('/join', middlewares_1.isNotLoggedIn, page_1.renderJoin);
router.get('/', page_1.renderMain);
router.get('/hashtag', page_1.renderHashtag); // Hashtag?hashtag=고양이
// module.exports = router;
exports.default = router;

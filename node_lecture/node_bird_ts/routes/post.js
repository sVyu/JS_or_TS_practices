"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const post_1 = require("../controllers/post");
const router = express_1.default.Router();
try {
    fs_1.default.readdirSync('uploads');
}
catch (error) {
    fs_1.default.mkdirSync('uploads');
}
const upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            // console.log(file);
            // 이미지.png → 이미지{날짜+시간}.png
            const ext = path_1.default.extname(file.originalname);
            cb(null, path_1.default.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});
// const
router.post('/img', middlewares_1.isLoggedIn, upload.single('img'), post_1.afterUploadImage);
const upload2 = (0, multer_1.default)();
router.post('/', middlewares_1.isLoggedIn, upload2.none(), post_1.uploadPost);
exports.default = router;

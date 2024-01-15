import express from 'express';
import { isLoggedIn } from '../middlewares';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { afterUploadImage, uploadPost } from '../controllers/post';

const router = express.Router();
try {
    fs.readdirSync('uploads');
} catch (error) {
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            // console.log(file);
            // 이미지.png → 이미지{날짜+시간}.png
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

// const
router.post('/img', isLoggedIn, upload.single('img'), afterUploadImage);

const upload2 = multer();
router.post('/', isLoggedIn, upload2.none(), uploadPost);

export default router;
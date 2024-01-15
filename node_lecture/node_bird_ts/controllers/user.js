"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.follow = void 0;
// import User from '../models/user';
const user_1 = require("../services/user");
const follow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // req.user.id, req.params.id
    try {
        const result = yield (0, user_1.follow)(req.user.id, req.params.id);
        if (result === 'ok') {
            res.send('success');
        }
        else if (result === 'no user') {
            res.status(404).send('no user');
        }
        // const user = await User.findOne({ where: { id: req.user.id } });
        // if (user) {
        //     await user.addFollowing(parseInt(req.params.id, 10));
        //     res.send('success');
        // } else {
        //     console.log('no user error !!');
        //     res.status(404).send('no user');
        // }
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.follow = follow;

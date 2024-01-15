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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
jest.mock('../models/user');
const user_1 = __importDefault(require("../models/user"));
const user_2 = require("./user");
describe('follow', () => {
    const req = {
        user: { id: 1 },
        params: { id: 2 },
    };
    const res = {
        status: jest.fn(() => res),
        send: jest.fn(),
    };
    const next = jest.fn();
    test('사용자를 찾아 팔로잉을 추가하고 success를 응답해야 함', () => __awaiter(void 0, void 0, void 0, function* () {
        user_1.default.findOne.mockReturnValue({
            addFollowing(id) {
                return Promise.resolve(true);
            }
        });
        yield (0, user_2.follow)(req, res, next);
        expect(res.send).toBeCalledWith('success');
    }));
    test('사용자를 못 찾으면 res.status(404).send(no user)를 호출함', () => __awaiter(void 0, void 0, void 0, function* () {
        user_1.default.findOne.mockReturnValue(null);
        yield (0, user_2.follow)(req, res, next);
        expect(res.status).toBeCalledWith(404);
        expect(res.send).toBeCalledWith('no user');
    }));
    test('DB에서 에러가 발생하면 next(error) 호출함', () => __awaiter(void 0, void 0, void 0, function* () {
        const message = 'DB에러';
        user_1.default.findOne.mockReturnValue(Promise.reject(message));
        yield (0, user_2.follow)(req, res, next);
        expect(next).toBeCalledWith(message);
    }));
});

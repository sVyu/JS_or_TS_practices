"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const user_1 = __importDefault(require("./user"));
const config_1 = __importDefault(require("../config/config"));
const config = config_1.default['test'];
const sequelize = new sequelize_1.default.Sequelize(config.database, config.username, config.password, config);
describe('User 모델', () => {
    test('static initiate 메서드 호출', () => {
        expect(user_1.default.initiate(sequelize)).toBe(undefined);
    });
    test('static associate 메서드 호출', () => {
        expect(user_1.default.associate()).toBe(undefined);
        // js
        // const db = {
        //     User: {
        //         hasMany: jest.fn(),
        //         belongsToMany: jest.fn(),
        //     },
        //     Post: {}
        // }
        // User.associate(db);
        // expect(db.User.hasMany).toHaveBeenCalledWith(db.Post)
        // expect(db.User.belongsToMany).toHaveBeenCalledTimes(2);
    });
});

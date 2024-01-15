"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const user_1 = __importDefault(require("./user"));
const hashtag_1 = __importDefault(require("./hashtag"));
class Post extends sequelize_1.default.Model {
    static initiate(sequelize) {
        Post.init({
            content: {
                type: sequelize_1.default.STRING(140),
                allowNull: false,
            },
            img: {
                type: sequelize_1.default.STRING(200),
                allowNull: true,
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            paranoid: false,
            modelName: 'Post',
            tableName: 'posts',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate() {
        Post.belongsTo(user_1.default);
        Post.belongsToMany(hashtag_1.default, { through: 'PostHashtag' });
        // PostHashtag에 바로 접근하고 싶다면
        // db.sequelize.models.PostHashtag
    }
}
// module.exports = Post;
exports.default = Post;

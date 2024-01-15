import Sequelize, { Model, CreationOptional, BelongsToManyGetAssociationsMixin } from 'sequelize';
import Post from './post';

class Hashtag extends Model {
    declare id: CreationOptional<number>;
    declare title: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare getPosts: BelongsToManyGetAssociationsMixin<Post>;

    static initiate(sequelize: Sequelize.Sequelize) {
        Hashtag.init({
            title: {
                type: Sequelize.STRING(15),
                allowNull: false,
                unique: true,
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            paranoid: false,
            modelName: 'Hashtag',
            tableName: 'hashtags',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        })
    }
    static associate() {
        Hashtag.belongsToMany(Post, { through: 'PostHashtag' });
    }
}

// module.exports = Hashtag;
export default Hashtag;
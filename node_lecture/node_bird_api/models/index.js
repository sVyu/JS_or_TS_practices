const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

const env = process.env.NODE_ENV || 'development';

// config를 불러와서
const config = require('../config/config')[env];
const db = {};
// sequelize 연결을 만든다 (연결한 건 아니다 -> app.js 에서 처리)
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

// 각각의 모델은 두고 두고 재사용 되기 때문에 db라는 객체로 묶어 놓는다
db.sequelize = sequelize;

const basename = path.basename(__filename);
fs.readdirSync(__dirname)
  .filter(file => {
    // 숨김파일 및 index.js 제외하고, js 파일만 처리하게끔 처리
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file));
    console.log(file, model.name);
    db[model.name] = model;
    model.initiate(sequelize);
  });

Object.keys(db).forEach(modelName => {
  console.log('db', db, modelName);
  // associate가 있다면 associate도 호출
  if (db[modelName].associate){
    db[modelName].associate(db);
  }
})

// db만 import해서 써도 객체 하나만 해도 sequelize 연결도 되고 모델도 사용 가능
module.exports = db;
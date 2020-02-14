'use strict';

module.exports = {
  production: {
    username: 'root',
    password: 'xxx',
    database: 'egg_sequelize_dev',
    host: 'localhost',
    post: 3306,
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: 'xxx',
    database: 'egg_sequelize_test',
    host: 'localhost',
    post: 3306,
    dialect: 'mysql',
  },
};

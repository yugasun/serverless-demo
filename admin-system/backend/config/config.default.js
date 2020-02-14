/* eslint valid-jsdoc: "off" */

'use strict';

const path = require('path');
// inject environment variables by dotenv
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({
    path: path.join(__dirname, '..', '.env.local'),
  });
} else {
  require('dotenv').config();
}

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  const isLocal = appInfo.env === 'local';
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {
    env: 'prod', // 推荐云函数的 egg 运行环境变量修改为 prod
    rundir: '/tmp',
    logger: {
      dir: '/tmp',
    },
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1580783791359_8688';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // TODO: should change to deploy url.
    deployUrl: isLocal ? 'http://127.0.0.1:7001/' : 'https://service-f1bhmhk4-1251556596.gz.apigw.tencentcs.com/release/',
    authRedirectUrl: isLocal ? 'http://localhost:9528/#/login' : 'https://sls-admin.yugasun.com/#/login',
    // myAppName: 'egg',
    sequelize: {
      sync: true, // whether sync when app init
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    redis: {
      client: {
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD,
        db: 0,
      },
    },
    security: {
      csrf: {
        enable: false,
      },
    },
    cors: {
      origin: '*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    },
    jwt: {
      secret: process.env.AUTHING_APPSECRET,
    },
    authing: {
      appId: process.env.AUTHING_APPID,
      appSecret: process.env.AUTHING_APPSECRET,
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};

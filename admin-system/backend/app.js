'use strict';

class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  configWillLoad() {
    // The config file has been read and merged, but it has not yet taken effect
    // This is the last time the application layer modifies the configuration
    // Note: This function only supports synchronous calls.
    // For example: the password in the parameter is encrypted, decrypt it here
  }

  async didLoad() {
    // All configurations have been loaded
    // Can be used to load the application custom file, start a custom service
  }

  async willReady() {
    // All plugins have been started, but the application is not yet ready
    // Can do some data initialization and other operations
    // Application will start after these operations executed succcessfully

    // For example: loading data from the database into the in-memory cache
    // TODO: init db migrate locally, it can not sync in scf,
    // TODO: better db miration method is using remote connection, and run `sequelize db:migrate` locally
    const isDev = process.env.NODE_ENV === 'development';
    if (isDev && this.app.config.sequelize.sync) {
      try {
        console.log('Start syncing database models...');
        // Notice!!!: For security you should not set force to true, because it will drop all tables.
        await this.app.model.sync({ logging: console.log, force: isDev });
        console.log('Start init database data...');
        // TODO: this init data is for demo
        await this.app.model.query("INSERT INTO roles (id, name, created_at, updated_at) VALUES (1, 'admin', '2020-02-04 09:54:25', '2020-02-04 09:54:25'),(2, 'editor', '2020-02-04 09:54:30', '2020-02-04 09:54:30');");
        await this.app.model.query("INSERT INTO users (id, name, password, age, avatar, introduction, register_type, created_at, updated_at, role_id) VALUES (1, 'admin', 'e10adc3949ba59abbe56e057f20f883e', 20, 'https://yugasun.com/static/avatar.jpg', 'Fullstack Engineer', 'default', '2020-02-04 09:55:23', '2020-02-04 09:55:23', 1);");
        await this.app.model.query("INSERT INTO posts (id, title, content, created_at, updated_at, user_id) VALUES (2, 'Awesome Egg.js', 'Egg.js is a awesome framework', '2020-02-04 09:57:24', '2020-02-04 09:57:24', 1),(3, 'Awesome Serverless', 'Build web, mobile and IoT applications using Tencent Cloud and API Gateway, Tencent Cloud Functions, and more.', '2020-02-04 10:00:23', '2020-02-04 10:00:23', 1);");
        console.log('Successfully init database data.');
        console.log('Successfully sync database models.');
      } catch (e) {
        console.log(e);
        throw new Error('Database migration failed.');
      }
    }
  }

  async didReady() {
    // Application already ready
  }

  async serverDidReady() {
    // http / https server has started and begins accepting external requests
    // At this point you can get an instance of server from app.server
  }
}

module.exports = AppBootHook;

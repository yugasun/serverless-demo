'use strict';

const { factory } = require('factory-girl');

module.exports = app => {
  // Factory instance can be accessed via app.factory
  app.factory = factory;


  // Define user and default data
  factory.define('role', app.model.Role, {
    name: factory.sequence('Role.name', n => `name_${n}`),
  });

  factory.define('user', app.model.User, {
    name: factory.sequence('User.name', n => `name_${n}`),
    age: 18,
    avatar: 'https://yugasun.com/static/avatar.jpg',
    introduction: 'Fullstack Engineer',
    role_id: factory.assoc('role', 'id'),
  });

  factory.define('post', app.model.Post, {
    title: factory.sequence('Post.title', n => `title_${n}`),
    content: 'Awesome egg',
    user_id: factory.assoc('user', 'id'),
  });
};

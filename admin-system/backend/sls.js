'use strict';

const { Application } = require('egg');

const app = new Application({
  env: 'prod',
  mode: 'single',
});

module.exports = app
;

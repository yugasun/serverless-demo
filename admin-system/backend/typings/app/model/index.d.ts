// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportPost = require('../../../app/model/post');
import ExportRole = require('../../../app/model/role');
import ExportUser = require('../../../app/model/user');

declare module 'egg' {
  interface IModel {
    Post: ReturnType<typeof ExportPost>;
    Role: ReturnType<typeof ExportRole>;
    User: ReturnType<typeof ExportUser>;
  }
}

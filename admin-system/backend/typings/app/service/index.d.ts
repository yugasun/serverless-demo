// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportPost = require('../../../app/service/post');
import ExportRole = require('../../../app/service/role');
import ExportUser = require('../../../app/service/user');

declare module 'egg' {
  interface IService {
    post: ExportPost;
    role: ExportRole;
    user: ExportUser;
  }
}

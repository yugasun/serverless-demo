// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome = require('../../../app/controller/home');
import ExportPost = require('../../../app/controller/post');
import ExportRole = require('../../../app/controller/role');
import ExportUser = require('../../../app/controller/user');

declare module 'egg' {
  interface IController {
    home: ExportHome;
    post: ExportPost;
    role: ExportRole;
    user: ExportUser;
  }
}

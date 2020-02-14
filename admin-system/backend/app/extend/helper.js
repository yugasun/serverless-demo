'use strict';

const crypto = require('crypto');
const qs = require('querystring');

module.exports = {
  parseInt(string) {
    if (typeof string === 'number') return string;
    if (!string) return string;
    return parseInt(string) || 0;
  },

  /**
   * encrypt password
   * You should not use md5 in your online project
   * @param {string} password password string
   */
  encryptPwd(password) {
    const md5 = crypto.createHash('md5');
    return md5.update(password).digest('hex');
  },

  stringify(obj) {
    return qs.stringify(obj);
  },
};

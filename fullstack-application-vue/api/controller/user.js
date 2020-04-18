'use strict';

const mysql = require('mysql2');

// init mysql connection
function initMysqlPool() {
  const { DB_HOST, DB_PORT, DB_DATABASE, DB_USER, DB_PASSWORD } = process.env;

  const promisePool = mysql
    .createPool({
      host: DB_HOST,
      user: DB_USER,
      port: DB_PORT,
      password: DB_PASSWORD,
      database: DB_DATABASE,
      connectionLimit: 1,
    })
    .promise();

  return promisePool;
}

function ApiError(code, msg) {
  const e = new Error(msg);
  e.code = code;
  return e;
}

const pool = initMysqlPool();

module.exports = {
  async getUserList() {
    const [data] = await pool.query('select * from users');
    return data || [];
  },
  async createUser(user) {
    const { name, email, site } = user;
    const existUser = await this.getUserByName(name);
    if (existUser) {
      throw new ApiError(1000, `Name ${name} exist.`);
    }
    const [data] = await pool.query('INSERT into users SET ?', {
      name,
      email,
      site,
    });
    return data;
  },
  async getUserByName(name) {
    try {
      const [row] = await pool.query('SELECT * FROM users WHERE name = ?', [
        name,
      ]);
      if (row.name) {
        return row;
      }
      return false;
    } catch (e) {
      throw new ApiError(1001, e);
    }
  },
  async deleteUserByName(name) {
    const [data] = await pool.query(`DELETE FROM users WHERE name = "${name}"`);
    return data;
  },
  async deleteEmptyName() {
    const [data] = await pool.query("DELETE from users where name = ''");
    return data;
  },
};

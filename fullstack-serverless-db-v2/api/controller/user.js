'use strict';

const { Pool } = require('pg');

function ApiError(code, msg) {
  const e = new Error(msg);
  e.code = code;
  return e;
}

// init mysql connection
function initPgPool() {
  const pool = new Pool({
    connectionString: process.env.PG_CONNECT_STRING,
  });
  // init table
  pool.query(`CREATE TABLE IF NOT EXISTS users (
    ID serial NOT NULL,
    NAME           TEXT         NOT NULL,
    EMAIL          CHAR(50)     NOT NULL,
    SITE          CHAR(50)     NOT NULL
  );`);

  return pool;
}

const pool = initPgPool();

module.exports = {
  async getUserList() {
    const client = await pool.connect();
    const { rows } = await client.query({
      text: 'select * from users',
    });
    await client.end();
    return rows;
  },
  async createUser(user) {
    const { name, email, site } = user;
    const existUser = await this.getUserByName(name);
    if (existUser) {
      throw new ApiError(1000, `Name ${name} exist.`);
    }
    const client = await pool.connect();
    const { rowCount } = await client.query({
      text: 'INSERT INTO users(name, email, site) VALUES($1, $2, $3)',
      values: [name, email, site],
    });
    await client.end();
    return rowCount === 1;
  },
  async getUserByName(name) {
    try {
      const client = await pool.connect();
      const { rows } = await client.query({
        text: 'SELECT * FROM users WHERE name = $1',
        values: [name],
      });
      await client.end();
      if (rows.length > 0) {
        return rows;
      }
      return false;
    } catch (e) {
      throw new ApiError(1001, e);
    }
  },
  async deleteUserByName(name) {
    const client = await pool.connect();
    const { rows } = await client.query({
      text: 'DELETE FROM users WHERE name = $1',
      values: [name],
    });
    await client.end();
    return rows;
  },
};

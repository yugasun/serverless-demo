'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

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

const app = express();
app.use(bodyParser.json());
app.use(cors());

if (!app.promisePool) {
  app.promisePool = initMysqlPool();
}

app.get('/', (req, res) => {
  res.send(
    JSON.stringify({
      code: 0,
      message: `Server time: ${new Date().toString()}`,
    }),
  );
});

app.get('/flush', async (req, res) => {
  const [data] = await app.promisePool.query(
    "DELETE from users where name = ''",
  );
  res.send(
    JSON.stringify({
      code: 0,
      data,
      message: 'Flush database Success',
    }),
  );
});

// get user list
app.get('/users', async (req, res) => {
  const [data] = await app.promisePool.query('select * from users');
  res.send(
    JSON.stringify({
      code: 0,
      data,
    }),
  );
});

// add new user
app.post('/users', async (req, res) => {
  let result = '';
  try {
    const { name, email, site } = req.body;
    const [row] = await app.promisePool.query(
      'SELECT * FROM users WHERE name = ?',
      [name],
    );
    if (row && row.length > 0) {
      result = {
        code: 1000,
        data: name,
        message: `Name ${name} exist.`,
      };
    } else {
      const [data] = await app.promisePool.query('INSERT into users SET ?', {
        name,
        email,
        site,
      });
      result = {
        code: 0,
        data: data && data.insertId,
        message: 'Insert Success',
      };
    }
  } catch (e) {
    result = {
      code: 1001,
      data: e,
      message: 'Insert Fail',
    };
  }

  res.send(JSON.stringify(result));
});

// delete user
app.delete('/users/:name', async (req, res) => {
  let result = '';
  try {
    const { name } = req.params;
    const [data] = await app.promisePool.query(
      `DELETE FROM users WHERE name = "${name}"`,
    );
    result = {
      code: 0,
      data,
      message: 'Delete Success',
    };
  } catch (e) {
    result = {
      code: 1002,
      data: e,
      message: 'Delete Fail',
    };
  }

  res.send(JSON.stringify(result));
});

module.exports = app;

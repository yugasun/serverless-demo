'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

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

function jsonReturn(data) {
  return JSON.stringify(data);
}

const app = express();

if (!app.promisePool) {
  app.promisePool = initMysqlPool();
}

app.use(bodyParser.json());

app.use(cors());

app.get('/', (req, res) => {
  res.send(jsonReturn({ message: `Server time: ${new Date().toString()}` }));
});

app.get('/users', async (req, res) => {
  const [data] = await app.promisePool.query('select * from users');
  res.send(
    jsonReturn({
      data: data,
    }),
  );
});

app.post('/users', async (req, res) => {
  let result = '';
  try {
    const { name, email, site } = req.body;
    const [res] = await app.promisePool.query('INSERT into users SET ?', {
      name: name,
      email: email,
      site: site,
    });
    result = {
      data: res && res.insertId,
      message: 'Insert Success',
    };
  } catch (e) {
    result = {
      data: e,
      message: 'Insert Fail',
    };
  }

  res.send(jsonReturn(result));
});

module.exports = app;

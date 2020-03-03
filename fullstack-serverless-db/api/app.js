'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const UserController = require('./src/controller');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// get user list
app.get('/users', async (req, res) => {
  const data = await UserController.getUserList();
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
  const user = req.body;
  try {
    const data = await UserController.createUser(user);
    result = {
      code: 0,
      data,
      message: 'Insert Success',
    };
  } catch (e) {
    result = {
      code: e.code,
      message: `Insert Fail: ${e.message}`,
    };
  }

  res.send(JSON.stringify(result));
});

// delete user
app.delete('/users/:name', async (req, res) => {
  let result = '';
  try {
    const { name } = req.params;
    const data = await UserController.deleteUserByName(name);
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

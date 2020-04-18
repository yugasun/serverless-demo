'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const UserController = require('./controller/user');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send(
    JSON.stringify({
      code: 0,
      message: `Server time: ${new Date().toString()}`,
    }),
  );
});

app.get('/flush', async (req, res) => {
  const data = await UserController.deleteEmptyName();
  res.send(
    JSON.stringify({
      code: 0,
      data,
      message: 'Flush database Success',
    }),
  );
});

// get user list
app.get('/user', async (req, res) => {
  const data = await UserController.getUserList();
  res.send(
    JSON.stringify({
      code: 0,
      data,
    }),
  );
});

// add new user
app.post('/user', async (req, res) => {
  let result = '';
  try {
    const user = req.body;
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
app.delete('/user/:name', async (req, res) => {
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

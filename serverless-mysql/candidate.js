'use strict';

const uuid = require('uuid');
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
  promisePool.query(
    `CREATE TABLE IF NOT EXISTS candidates (
    id          VARCHAR(64)        NOT NULL,
    fullname    TEXT          NOT NULL,
    email       VARCHAR(64)      NOT NULL,
    experience  INT UNSIGNED  NOT NULL,
    submittedAt VARCHAR(64)      NOT NULL,
    updatedAt   VARCHAR(64)      NOT NULL
  );`,
  );

  return promisePool;
}

const pool = initMysqlPool();

module.exports.submit = async (event, context, callback) => {
  const requestBody = JSON.parse(event.body);
  const fullname = requestBody.fullname;
  const email = requestBody.email;
  const experience = requestBody.experience;

  if (
    typeof fullname !== 'string' ||
    typeof email !== 'string' ||
    typeof experience !== 'number'
  ) {
    console.error('Validation Failed');
    callback(
      new Error("Couldn't submit candidate because of validation errors."),
    );
    return;
  }

  const timestamp = new Date().getTime();
  const candidate = {
    id: uuid.v4(),
    fullname: fullname,
    email: email,
    experience: experience,
    submittedAt: timestamp,
    updatedAt: timestamp,
  };
  try {
    console.log('Submitting candidate');
    const [data] = await pool.query('INSERT into candidates SET ?', candidate);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Sucessfully submitted candidate with email ${email}`,
        candidateId: data.id,
      }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Unable to submit candidate with email ${email}`,
      }),
    };
  }
};

module.exports.list = async (event, context, callback) => {
  console.log('Scanning Candidate table.');
  try {
    const [data] = await pool.query('select * from candidates');
    return {
      statusCode: 200,
      body: JSON.stringify({
        candidates: data,
      }),
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Unable to get candidates`,
      }),
    };
  }
};

module.exports.get = async (event, context, callback) => {
  try {
    const id = event.queryString.id || '';
    const [row] = await pool.query('SELECT * FROM candidates WHERE id = ?', [
      id,
    ]);
    return row;
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Unable to get candidate with id ${id}`,
      }),
    };
  }
};

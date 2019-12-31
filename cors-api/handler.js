'use strict';

// mock function
function retrieveProduct(event) {
  const { queryString } = event;
  return {
    id: Number(queryString.id),
    name: 'good1',
    price: 10,
  };
}

// mock function
function createProduct(event) {
  return {
    id: 1,
    name: 'good1',
    price: 10,
  };
}

module.exports.getProduct = (event, context, callback) => {
  const product = retrieveProduct(event);

  const response = {
    isBase64Encoded: false,
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': 'http://127.0.0.1:8080/',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      product: product,
    }),
  };

  callback(null, response);
};

module.exports.createProduct = (event, context, callback) => {
  // Do work to create Product
  const product = createProduct(event);

  const response = {
    isBase64Encoded: false,
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      product: product,
    }),
  };

  callback(null, response);
};

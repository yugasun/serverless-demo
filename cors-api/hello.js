const middy = require('middy');
const { cors } = require('middy/middlewares');

// This is your common handler, no way different than what you are used to do every day
// in AWS Lambda
const hello = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: 'Hello, world!',
  };

  return callback(null, response);
};

// Let's "middyfy" our handler, then we will be able to attach middlewares to it
const handler = middy(hello).use(
  cors(),
); // Adds CORS headers to responses

module.exports = { handler };

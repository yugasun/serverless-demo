const dotenv = require('dotenv');
const Koa = require('koa');
const KoaRouter = require('koa-router');


const { CODE_ENV } = process.env;
dotenv.config({
  path: `${__dirname}/.env.${CODE_ENV}`
})

const app = new Koa();
const router = new KoaRouter();

router.get('/', async(ctx) => {
  ctx.body = {
    name: process.env.USER_NAME,
    email: process.env.USER_EMAIL,
  }
})

app.use(router.allowedMethods()).use(router.routes());

// don't forget to export!
module.exports = app;
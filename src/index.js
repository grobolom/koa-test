const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

const db = require("../models");

const User = db.user;

router.get('/', async (ctx, next) => {
  // ctx.router ?
});

router.get('/videos', async (ctx, next) => {
  ctx.body = await db.video.findAll({ include: ['video_details']});
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, () => {
  console.log('listening on 3000');
});

module.exports = app;
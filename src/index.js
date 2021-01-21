const Koa = require('koa');
const Router = require('koa-router');
const probe = require("node-ffprobe");

const app = new Koa();
const router = new Router();

const db = require("../models");
const koaBody = require('koa-body');

const User = db.user;
const Video = db.video;

router.get('/videos', async (ctx, next) => {
  ctx.body = await db.video.findAll({ limit: 10, include: ['video_details']});
});

router.post('/videos', async (ctx, next) => {
  const { url, title, description, author } = ctx.request.body;
  // need to validate that we have all of the above, skipping for now
  const probe_data = await probe(url);
  console.log(probe_data);

  const duration = probe_data.streams[0].duration
  const aspect_ratio = probe_data.streams[0].display_aspect_ratio

  let video;

  try {
    video = await Video.create({
      title,
      description,
      author,
      duration,
      source: url,
      video_details: {
        aspect_ratio,
        ffprobe_metadata: probe_data,
      }
    }, { include: ['video_details']});
  } catch(e) {
    console.error(e);
    ctx.body = e;
  }

  ctx.body = video;
});

app
  .use(router.allowedMethods())
  .use(koaBody())
  .use(router.routes());

app.listen(3000, () => {
  console.log('listening on 3000');
});

module.exports = app;
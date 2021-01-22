const videoRoutes = require("./videos");
const KoaRouter = require("koa-router");

const router = new KoaRouter();

const videos = new KoaRouter();

videos
  .get("/videos", videoRoutes.index)
  .get("/videos/:uuid", videoRoutes.show)
  .post("/videos", videoRoutes.create);

router.use(videos.routes());

module.exports = router;

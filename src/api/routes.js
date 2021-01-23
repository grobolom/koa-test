const KoaRouter = require("koa-router");

const authRoutes = require("./auth");
const videoRoutes = require("./videos");
const middlewares = require("./middleware");

// It might be best to have each submodule define its own routes, as
// the route params are tied closely to the handling of those routes. However,
// this is something that can be fleshed out as the app expands.
const auth = new KoaRouter();
auth.post("/login", authRoutes.login).post("/register", authRoutes.register);

const videos = new KoaRouter();
videos
  .use(middlewares.needJWT)
  .get("/videos", videoRoutes.index)
  .get("/videos/:uuid", videoRoutes.show)
  .post("/videos", videoRoutes.create);

const router = new KoaRouter();
router.use(auth.routes()).use(videos.routes());

module.exports = router;

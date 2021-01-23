const Koa = require("koa");
const Router = require("koa-router");
// makes sure we have a ctx.request.body in our routes
const koaBody = require("koa-body");

const router = require("./api/routes");
const db = require("./db/models");
const { handleExceptions } = require("./api/middleware");

const app = new Koa();
app
  .use(router.allowedMethods())
  .use(koaBody())
  .use(handleExceptions)
  .use(router.routes());

const server = app.listen(6537);

module.exports = server;

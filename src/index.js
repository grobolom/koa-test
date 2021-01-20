const Koa = require('koa');
const app = new Koa();
const db = require("../models");
const User = db.user;

app.use(async ctx => {
  let admin = await User.findOne({ where: { username: 'admin' }});

  if (!admin) {
    admin = await User.create({ username: 'admin' });
  }

  ctx.body = admin.username;
});

app.listen(3000, () => {
  console.log('listening on 3000');
});

module.exports = app;
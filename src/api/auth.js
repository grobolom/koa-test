const jwt = require("jsonwebtoken");
const db = require("../db/models");
const bcrypt = require("bcrypt");
const Exception = require("./exception");

module.exports = {
  async register(ctx, next) {
    const { body } = ctx.request;
    const userData = {
      username: body.username,
      password: await bcrypt.hash(body.password, 10),
    };

    let user = await db.user.findOne({ where: { username: body.username } });
    if (user) {
      throw new Exception(401, "Username already taken.");
    }

    user = await db.user.create(userData);
    const obj = user.toJSON();

    delete obj.password;

    ctx.body = {
      token: jwt.sign(obj, "OUR_SUPER_SECRET_TACO_PARTY"),
      user: obj,
    };
  },

  async login(ctx, next) {
    const { body } = ctx.request;
    const user = await db.user.findOne({ where: { username: body.username } });

    if (!user) {
      ctx.throw(404, "user not found");
    }

    const isValid = await bcrypt.compare(body.password, user.password);

    if (isValid) {
      const obj = user.toJSON();
      delete obj.password;

      ctx.body = {
        token: jwt.sign(obj, "OUR_SUPER_SECRET_TACO_PARTY"),
        user: obj,
      };
    } else {
      return next(new Error("No!"));
    }
  },
};

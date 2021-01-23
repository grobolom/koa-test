const jwt = require("jsonwebtoken");
const Exception = require("./exception");

module.exports = {
  async needJWT(ctx, next) {
    try {
      let token = ctx.request.headers["authorization"];
      ctx.state.user = jwt.verify(
        token.replace("Bearer ", ""),
        "OUR_SUPER_SECRET_TACO_PARTY"
      );
      return next();
    } catch (err) {
      throw new Exception(401, "Unknown user");
    }
  },

  async handleExceptions(ctx, next) {
    try {
      await next();
    } catch (error) {
      if (error instanceof Exception) {
        ctx.status = error.code;
        ctx.body = error.body;
      } else {
        ctx.status = 500;
        ctx.body = { message: "Unknown error." };
      }
    }
  },
};

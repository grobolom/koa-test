const jwt = require("jsonwebtoken");
const Exception = require("./exception");

module.exports = {
  // TODO: extract the secret used here into a constant
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

  // Used to globally handle any exceptions we can tackle, and, at the least,
  // return a consistent REST response for any other internal error.
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

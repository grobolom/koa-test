const db = require("../db/models");
const probe = require("node-ffprobe");
const path = require("path");

module.exports = {
  async show(ctx, next) {
    ctx.body = await db.video.findOne({
      where: { id: ctx.params.uuid },
      include: ["video_details"],
    });
  },
  async index(ctx, next) {
    const page_size = 5;
    const offset = (ctx.query.page ?? 0) * page_size;

    const where = {};
    if (ctx.query.aspect_ratio) {
      where.video_details = {
        aspect_ratio: ctx.query.aspect_ratio,
      };
    }

    ctx.body = await db.video.findAndCountAll({
      where: where?.video,
      limit: page_size,
      offset,
      include: [
        {
          model: db.video_details,
          as: "video_details",
          where: where?.video_details,
        },
      ],
    });
  },

  async create(ctx, next) {
    const { url, title, description, author } = ctx.request.body;

    // need to validate that we have all of the above, skipping for now
    const probe_data = await probe(url);

    const duration = probe_data.streams[0].duration;
    const extension = path.extname(url);
    const aspect_ratio = probe_data.streams[0].display_aspect_ratio;

    let video;

    try {
      video = await Video.create(
        {
          title,
          description,
          author,
          duration,
          source: url,
          video_details: {
            aspect_ratio,
            extension,
            ffprobe_metadata: probe_data,
          },
        },
        { include: ["video_details"] }
      );
    } catch (e) {
      console.error(e);
      ctx.body = e;
    }

    ctx.body = video;
  },
};

// router.get("/videos/:uuid", );
// router.get("/videos", });
// router.post("/videos", );

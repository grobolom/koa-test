"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class video_details extends Model {
    static associate(models) {
      video_details.belongsTo(models.video, {
        foreignKey: "video_id",
        as: "video_details",
      });
    }
  }
  video_details.init(
    {
      video_id: DataTypes.INTEGER,
      extension: DataTypes.STRING,
      aspect_ratio: DataTypes.STRING,
      ffprobe_metadata: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "video_details",
    }
  );
  return video_details;
};

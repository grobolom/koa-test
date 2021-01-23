"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class video extends Model {
    static associate(models) {
      video.hasOne(models.video_details, {
        foreignKey: "video_id",
        as: "video_details",
      });
    }
  }
  video.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.DataTypes.UUIDV4,
      },
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      author: DataTypes.STRING,
      duration: DataTypes.DECIMAL,
      source: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "video",
    }
  );
  return video;
};

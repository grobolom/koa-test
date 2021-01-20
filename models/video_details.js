'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class video_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  video_details.init({
    extension: DataTypes.STRING,
    aspect_ratio: DataTypes.STRING,
    ffprobe_metadata: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'video_details',
  });
  return video_details;
};
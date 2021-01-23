"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("video_details", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      video_id: {
        type: Sequelize.UUID,
        references: { model: "videos", key: "id" },
        onDelete: "CASCADE",
      },
      extension: {
        type: Sequelize.STRING,
      },
      aspect_ratio: {
        type: Sequelize.STRING,
      },
      ffprobe_metadata: {
        type: Sequelize.JSON,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("video_details");
  },
};

"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("videos", [
      {
        id: 1,
        title: "An MMA fight",
        description: "Two people punching each other in the gut.",
        duration: "62.10",
        source: "MMACave",
        author: "UFC LLC.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        title: "A cooking video",
        description: "A pair of adventurers cooking assorted griffon meats.",
        duration: "12.50",
        source: "Cooking Channel",
        author: "Borak and Thorak",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        title: "Breaking News",
        description: "Three talking heads shouting old news at you.",
        duration: "22.40",
        source: "Moltar's News Network",
        author: "Moltar LLC",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("video_details", [
      {
        video_id: 1,
        extension: "mp4",
        aspect_ratio: "16:9",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        video_id: 2,
        extension: "mov",
        aspect_ratio: "4:3",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        video_id: 3,
        extension: "flv",
        aspect_ratio: "22:7",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("videos", null, {});
  },
};

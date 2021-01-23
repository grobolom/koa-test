"use strict";

const { v4: uuid } = require("uuid");
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("users", [
      {
        username: "admin",
        password: await bcrypt.hash("password", 10),
      },
    ]);

    const uuids = {
      1: uuid(),
      2: uuid(),
      3: uuid(),
      4: uuid(),
      5: uuid(),
      6: uuid(),
    };

    await queryInterface.bulkInsert("videos", [
      {
        id: uuids[1],
        title: "An MMA fight",
        description: "Two people punching each other in the gut.",
        duration: "62.10",
        source: "https://foo.bar/mma.mp4",
        author: "UFC LLC.",
      },
      {
        id: uuids[2],
        title: "A cooking video",
        description: "A pair of adventurers cooking assorted griffon meats.",
        duration: "12.50",
        source: "https://foo.bar/cooking.mov",
        author: "Borak and Thorak",
      },
      {
        id: uuids[3],
        title: "Breaking News",
        description: "Three talking heads shouting old news at you.",
        duration: "22.40",
        source: "https://foo.bar/news.flv",
        author: "Moltar LLC",
      },
      {
        id: uuids[4],
        title: "Restaurant video",
        description: "Someone cooking things.",
        duration: "21.10",
        source: "https://foo.bar/restaurant.mp4",
        author: "CookingLLC",
      },
      {
        id: uuids[5],
        title: "Chewbacca Operatic Singing",
        description: "A frightening experience",
        duration: "194383.50",
        source: "https://foo.bar/chewbacca.flv",
        author: "Moltar LLC",
      },
      {
        id: uuids[6],
        title: "Borg attacks",
        description: "Picard punching borgs",
        duration: "2.50",
        source: "https://foo.bar/borgs.mov",
        author: "PicardCo",
      },
    ]);

    await queryInterface.bulkInsert("video_details", [
      {
        video_id: uuids[1],
        extension: "mp4",
        aspect_ratio: "16:9",
      },
      {
        video_id: uuids[2],
        extension: "mov",
        aspect_ratio: "4:3",
      },
      {
        video_id: uuids[3],
        extension: "flv",
        aspect_ratio: "16:9",
      },
      {
        video_id: uuids[4],
        extension: "mp4",
        aspect_ratio: "16:9",
      },
      {
        video_id: uuids[5],
        extension: "flv",
        aspect_ratio: "4:3",
      },
      {
        video_id: uuids[6],
        extension: "mov",
        aspect_ratio: "22:7",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
    await queryInterface.bulkDelete("videos", null, {});
    await queryInterface.bulkDelete("video_details", null, {});
  },
};

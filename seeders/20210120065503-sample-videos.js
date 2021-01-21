'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('videos', [{
      id: 1,
      title: 'An MMA fight',
      description: 'Two people punching each other in the gut.',
      duration: '62.10',
      source: 'MMACave',
      author: 'UFC LLC.',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);

    await queryInterface.bulkInsert('video_details', [{
      video_id: 1,
      extension: 'mp4',
      aspect_ratio: '16:9',
      createdAt: new Date(),
      updatedAt: new Date(),
    }])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('videos', null, {});
  }
};

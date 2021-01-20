'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('videos', [{
      title: 'An MMA fight',
      description: 'Two people punching each other in the gut.',
      duration: '62.10',
      source: 'MMACave',
      author: 'UFC LLC.',
      createdAt: new Date(),
      updatedAt: new Date(),
    }])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('videos', null, {});
  }
};

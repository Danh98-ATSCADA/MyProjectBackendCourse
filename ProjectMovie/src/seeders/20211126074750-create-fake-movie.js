'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('Movies', [
      {
        id:1,
        name: 'IronMan',
        alias: 'Iron1',
        trailer: 'link video',
        duration: 180,
        description: 'abc',
        comingDate: "2021-11-19",
        createdAt:"2021-11-19 11:36:30",
        updatedAt:"2021-11-19 11:36:30"
      },
      {
        id:2,
        name: 'IronMan123',
        alias: 'Iron1',
        trailer: 'link video',
        duration: 180,
        description: 'abc',
        comingDate: "2021-11-19",
        createdAt:"2021-11-19 11:36:30",
        updatedAt:"2021-11-19 11:36:30"
      }

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Movies', null, {});
  }
};

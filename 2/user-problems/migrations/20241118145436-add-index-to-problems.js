'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addIndex('users', ['problems'], {
      name: 'idx_problems',
      unique: false,
    });
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.removeIndex('users', 'idx_problems');
  },
};

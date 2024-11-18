'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [];
    const batchSize = 10000;
    const totalUsers = 1000000;


    for (let i = 0; i < totalUsers; i++) {
      users.push({
        name: `User${i}`,
        surname: `Surname${i}`,
        age: Math.floor(Math.random() * 50) + 18,
        sex: i % 2 === 0 ? 'Male' : 'Female',
        problems: Math.random() > 0.5,
        createdAt: new Date(),
        updatedAt: new Date(),
      });


      if (users.length === batchSize) {
        await queryInterface.bulkInsert('users', users);
        users.length = 0;
      }
    }


    if (users.length > 0) {
      await queryInterface.bulkInsert('users', users);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};

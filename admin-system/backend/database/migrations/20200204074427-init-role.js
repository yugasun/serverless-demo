'use strict';

module.exports = {
  // The function called when performing a database upgrade, create a `users` table
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('roles', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(30),
      created_at: DATE,
      updated_at: DATE,
    });
  },
  // The function called when performing a database downgrade, delete the `users` table
  down: async queryInterface => {
    await queryInterface.dropTable('roles');
  },
};

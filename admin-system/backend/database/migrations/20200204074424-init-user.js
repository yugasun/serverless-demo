'use strict';

module.exports = {
  // The function called when performing a database upgrade, create a `users` table
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, TEXT } = Sequelize;
    await queryInterface.createTable('users', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(30),
      password: STRING(64),
      age: INTEGER,
      avatar: {
        type: STRING(128),
        allowNull: true,
      },
      introduction: {
        type: TEXT,
        allowNull: true,
      },
      created_at: DATE,
      updated_at: DATE,
    });
  },
  // The function called when performing a database downgrade, delete the `users` table
  down: async queryInterface => {
    await queryInterface.dropTable('users');
  },
};

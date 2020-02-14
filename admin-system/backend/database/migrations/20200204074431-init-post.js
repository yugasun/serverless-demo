'use strict';

module.exports = {
  // The function called when performing a database upgrade, create a `posts` table
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('posts', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: STRING(30),
      content: STRING(255),
      created_at: DATE,
      updated_at: DATE,
    });
  },
  // The function called when performing a database downgrade, delete the `posts` table
  down: async queryInterface => {
    await queryInterface.dropTable('posts');
  },
};

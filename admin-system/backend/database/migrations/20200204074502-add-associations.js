'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER } = Sequelize;
    await queryInterface.addColumn(
      'users', // name of Source model
      'role_id', // name of the key we're adding
      {
        type: INTEGER,
        references: {
          model: 'roles', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
    await queryInterface.addColumn(
      'posts', // name of Source model
      'user_id', // name of the key we're adding
      {
        type: INTEGER,
        references: {
          model: 'users', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
  },

  down: async queryInterface => {
    await queryInterface.removeColumn(
      'posts', // name of Source model
      'user_id' // key we want to remove
    );
    await queryInterface.removeColumn(
      'users', // name of Source model
      'role_id' // key we want to remove
    );
  },
};

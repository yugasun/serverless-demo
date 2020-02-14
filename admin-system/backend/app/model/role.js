'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Role = app.model.define('role', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    created_at: DATE,
    updated_at: DATE,
  });

  Role.associate = () => {
    app.model.Role.hasMany(app.model.User, { as: 'users' });
  };

  return Role;
};

'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    password: STRING(64),
    age: INTEGER,
    email: STRING(64),
    phone_number: STRING(64),
    register_type: {
      type: STRING(16),
      default: 'default',
    },
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

  User.associate = () => {
    app.model.User.belongsTo(app.model.Role, { as: 'role', foreignKey: 'role_id' });
  };

  return User;
};

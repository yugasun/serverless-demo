'use strict';

const { Service } = require('egg');


class UserService extends Service {
  async list(options) {
    const { ctx: { model } } = this;
    return model.User.findAndCountAll({
      ...options,
      order: [[ 'created_at', 'desc' ], [ 'id', 'desc' ]],
    });
  }

  async find(id) {
    const { ctx: { model } } = this;
    const user = await model.User.findByPk(id, {
      include: [{
        model: model.Role,
        as: 'role',
        attributes: [ 'id', 'name' ],
      }],
    });
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    return user;
  }

  async findByName(name) {
    const { ctx: { model } } = this;
    const user = await model.User.findOne({
      where: {
        name,
      },
      include: [{
        model: model.Role,
        as: 'role',
        attributes: [ 'id', 'name' ],
      }],
    });
    return user;
  }

  async create(user) {
    const { ctx: { model } } = this;
    return model.User.create(user);
  }

  async update({ id, updates }) {
    const user = await this.ctx.model.User.findByPk(id);
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    return user.update(updates);
  }

  async destroy(id) {
    const user = await this.ctx.model.User.findByPk(id);
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    return user.destroy();
  }
}

module.exports = UserService;

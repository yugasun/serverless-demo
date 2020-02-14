'use strict';

const { Service } = require('egg');

class RoleService extends Service {
  async list(options) {
    const { ctx: { model } } = this;
    return model.Role.findAndCountAll({
      ...options,
      order: [[ 'created_at', 'desc' ], [ 'id', 'desc' ]],
    });
  }

  async find(id) {
    const { ctx: { model } } = this;
    const role = await model.Role.findByPk(id);
    if (!role) {
      this.ctx.throw(404, 'role not found');
    }
    return role;
  }

  async create(role) {
    const { ctx: { model } } = this;
    return model.Role.create(role);
  }

  async update({ id, updates }) {
    const role = await this.ctx.model.Role.findByPk(id);
    if (!role) {
      this.ctx.throw(404, 'role not found');
    }
    return role.update(updates);
  }

  async destroy(id) {
    const role = await this.ctx.model.Role.findByPk(id);
    if (!role) {
      this.ctx.throw(404, 'role not found');
    }
    return role.destroy();
  }
}

module.exports = RoleService;

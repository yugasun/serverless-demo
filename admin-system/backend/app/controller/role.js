'use strict';

const { Controller } = require('egg');

class RoleController extends Controller {
  async index() {
    const { ctx } = this;
    const { query, service, helper } = ctx;
    const options = {
      limit: helper.parseInt(query.limit),
      offset: helper.parseInt(query.offset),
    };
    const data = await service.role.list(options);
    ctx.body = {
      code: 0,
      data: {
        count: data.count,
        items: data.rows,
      },
    };
  }

  async show() {
    const { ctx } = this;
    const { params, service, helper } = ctx;
    const id = helper.parseInt(params.id);
    ctx.body = await service.role.find(id);
  }

  async create() {
    const { ctx } = this;
    const { service } = ctx;
    const body = ctx.request.body;
    const role = await service.role.create(body);
    ctx.status = 201;
    ctx.body = role;
  }

  async update() {
    const { ctx } = this;
    const { params, service, helper } = ctx;
    const body = ctx.request.body;
    const id = helper.parseInt(params.id);
    ctx.body = await service.role.update({
      id,
      updates: body,
    });
  }

  async destroy() {
    const { ctx } = this;
    const { params, service, helper } = ctx;
    const id = helper.parseInt(params.id);
    await service.role.destroy(id);
    ctx.status = 200;
  }
}

module.exports = RoleController;

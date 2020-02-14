'use strict';

const { Controller } = require('egg');

class PostController extends Controller {
  async index() {
    const { ctx } = this;
    const { query, model, service, helper } = ctx;
    const options = {
      limit: helper.parseInt(query.limit),
      offset: helper.parseInt(query.offset),
      include: [{
        model: model.User,
        as: 'user',
      }],
    };

    const data = await service.post.list(options);
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
    const post = await service.post.find(id);
    ctx.body = {
      code: 0,
      data: post,
    };
  }

  async create() {
    const { ctx } = this;
    const { service } = ctx;
    const body = ctx.request.body;
    const post = await service.post.create(body);
    ctx.status = 201;
    ctx.body = {
      code: 0,
      data: post,
    };
  }

  async update() {
    const { ctx } = this;
    const { params, service, helper } = ctx;
    const body = ctx.request.body;
    const id = helper.parseInt(params.id);
    const res = await service.post.update({
      id,
      updates: body,
    });
    ctx.body = {
      code: 0,
      data: res,
    };
  }

  async destroy() {
    const { ctx } = this;
    const { params, service, helper } = ctx;
    const id = helper.parseInt(params.id);
    await service.post.destroy(id);
    ctx.status = 200;
    ctx.body = {
      code: 0,
      success: true,
    };
  }
}

module.exports = PostController;

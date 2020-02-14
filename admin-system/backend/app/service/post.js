'use strict';

const { Service } = require('egg');

class PostService extends Service {
  async list(options) {
    const { ctx: { model } } = this;
    const opt = {
      ...options,
      order: [[ 'created_at', 'desc' ], [ 'id', 'desc' ]],
    };
    if (opt.user_id) {
      opt.where = {
        user_id: opt.user_id,
      };
    }
    return model.Post.findAndCountAll(opt);
  }

  async find(id) {
    const { ctx: { model } } = this;
    const post = await model.Post.findByPk(id, {
      include: [{
        model: model.User,
        as: 'user',
        attributes: [ 'id', 'name', 'age', 'avatar' ],
      }],
    });
    if (!post) {
      this.ctx.throw(404, 'post not found');
    }
    return post;
  }

  async create(post) {
    const { ctx: { model } } = this;
    return model.Post.create(post);
  }

  async update({ id, user_id, updates }) {
    const { ctx: { model } } = this;
    const post = await model.Post.findByIdWithUser(id, user_id);
    if (!post) this.ctx.throw(404, 'post not found');
    return post.update(updates);
  }

  async destroy(id) {
    const { ctx: { model } } = this;
    const post = await model.Post.findByPk(id);
    if (!post) this.ctx.throw(404, 'post not found');
    return post.destroy();
  }
}

module.exports = PostService;

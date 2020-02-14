'use strict';
const { assert, app } = require('egg-mock/bootstrap');


describe('test/app/controller/post.test.js', () => {
  describe('GET /posts', () => {
    it('should work', async () => {
      // Quickly create some posts object into the database via factory-girl
      await app.factory.createMany('post', 3);
      const res = await app.httpRequest().get('/posts?limit=2');
      assert(res.status === 200);
      const { rows } = res.body;
      assert(rows.length === 2);
      assert(rows[0].title);
      assert(rows[0].content);
    });
  });

  describe('GET /posts/:id', () => {
    it('should work', async () => {
      const post = await app.factory.create('post');
      const res = await app.httpRequest().get(`/posts/${post.id}`);
      assert(res.status === 200);
      assert(res.body.age === post.age);
    });
  });

  describe('POST /posts', () => {
    it('should work', async () => {
      app.mockCsrf();
      let res = await app.httpRequest().post('/posts')
        .send({
          title: 'title',
          content: 'content',
        });
      assert(res.status === 201);
      assert(res.body.id);

      res = await app.httpRequest().get(`/posts/${res.body.id}`);
      assert(res.status === 200);
      assert(res.body.title === 'title');
    });
  });

  describe('DELETE /posts/:id', () => {
    it('should work', async () => {
      const post = await app.factory.create('post');

      app.mockCsrf();
      const res = await app.httpRequest().delete(`/posts/${post.id}`);
      assert(res.status === 200);
    });
  });
});

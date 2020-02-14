'use strict';
const { assert, app } = require('egg-mock/bootstrap');


describe('test/app/controller/role.test.js', () => {
  describe('GET /roles', () => {
    it('should work', async () => {
      // Quickly create some roles object into the database via factory-girl
      await app.factory.createMany('role', 3);
      const res = await app.httpRequest().get('/roles?limit=2');
      assert(res.status === 200);
      const { rows } = res.body;
      assert(rows.length === 2);
      assert(rows[0].name);
    });
  });

  describe('GET /roles/:id', () => {
    it('should work', async () => {
      const role = await app.factory.create('role');
      const res = await app.httpRequest().get(`/roles/${role.id}`);
      assert(res.status === 200);
      assert(res.body.name === role.name);
    });
  });

  describe('POST /roles', () => {
    it('should work', async () => {
      app.mockCsrf();
      let res = await app.httpRequest().post('/roles')
        .send({
          name: 'name',
        });
      assert(res.status === 201);
      assert(res.body.id);

      res = await app.httpRequest().get(`/roles/${res.body.id}`);
      assert(res.status === 200);
      assert(res.body.name === 'name');
    });
  });

  describe('DELETE /roles/:id', () => {
    it('should work', async () => {
      const role = await app.factory.create('role');

      app.mockCsrf();
      const res = await app.httpRequest().delete(`/roles/${role.id}`);
      assert(res.status === 200);
    });
  });
});

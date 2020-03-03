'use strict';

require('./env');

const Vue = require('vue');
const axios = require('axios');

module.exports = new Vue({
  el: '#root',
  data: {
    loading: true,
    message: 'Click me!',
    isVisible: true,
    form: {
      name: '',
      email: '',
      site: '',
    },
    userList: [],
  },
  methods: {
    async queryServer() {
      const response = await fetch(window.env.apiUrl);
      const result = await response.json();
      this.message = result.message;
    },

    // get user list
    async getUsers() {
      this.loading = true;
      const { data } = await axios.get(`${window.env.apiUrl}users`);

      if (data.code !== 0) {
        this.userList = [];
      } else {
        this.userList = data.data || [];
      }
      this.loading = false;
    },

    formCheck(data) {
      if (!data.name) {
        alert('Please input name');
        return false;
      }
      if (!data.email) {
        alert('Please input email');
        return false;
      }
      if (!data.site) {
        alert('Please input site');
        return false;
      }
      return true;
    },

    // add a user
    async addUser() {
      const formData = this.form;
      if (!this.formCheck(formData)) {
        return;
      }
      this.loading = true;
      const { data } = await axios.post(`${window.env.apiUrl}users`, formData);
      if (data.code !== 0) {
        alert(data.message);
      } else {
        this.getUsers();
      }
      this.loading = false;
    },

    async deleteUser(name) {
      const { data } = await axios.delete(`${window.env.apiUrl}users/${name}`);
      if (data.code !== 0) {
        alert(data.message);
      } else {
        this.getUsers();
      }
    },
  },
  mounted() {
    // get user list after ui mounted
    this.getUsers();
  },
});

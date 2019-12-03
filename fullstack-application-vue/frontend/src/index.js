'use strict';

require('../env');

const Vue = require('vue');
const axios = require('axios');

module.exports = new Vue({
  el: '#root',
  data: {
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
      const res = await axios.get(window.env.apiUrl + 'users');
      this.userList = res.data && res.data.data || [];
    },

    // add a user
    async addUser() {
      const data = this.form;
      const res = await axios.post(window.env.apiUrl + 'users', data);
      console.log(res);
      if (res.data) {
        this.getUsers();
      }
    },
  },
  mounted() {
    // get user list after ui mounted
    this.getUsers();
  }
});

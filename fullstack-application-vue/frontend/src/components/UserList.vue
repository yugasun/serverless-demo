<template>
  <div class="right">
    <h3>User List</h3>
    <!-- user list -->
    <section class="user-list">
      <ul v-if="list.length > 0">
        <li
          v-for="item in list"
          :key="item.id"
        >
          <p>
            <b>Name: {{ item.name }}</b>&nbsp;&nbsp;
            <b>Email: {{ item.email }}</b>&nbsp;&nbsp;
            <b>Site: {{ item.site }}</b>
            <button @click="deleteUser(item.name)">x</button>
          </p>
        </li>
      </ul>
      <span v-else>{{ loading ? 'Loading' : 'No Data'}}</span>
    </section>
  </div>
</template>
<script>
export default {
  name: "UserList",
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    list: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    deleteUser(name) {
      this.$emit("delete", name);
    }
  }
};
</script>
<style lang="css" scoped>
.user-list {
  color: #fff;
  width: 500px;
  margin: 10px auto;
  padding: 20px;
  border: 2px solid #fff;
}
</style>

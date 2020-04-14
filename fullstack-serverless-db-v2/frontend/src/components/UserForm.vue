<template>
  <div class="left">
    <h3>User Form</h3>
    <!-- user form -->
    <section
      class="user-form"
      action="#"
    >
      <div class="form-item">
        <label for="name">Name:</label>
        <input
          name="name"
          v-model="form.name"
          type="text"
        />
        <br />
      </div>

      <div class="form-item">
        <label for="email">Email:</label>
        <input
          name="email"
          v-model="form.email"
          type="email"
        />
        <br />
      </div>

      <div class="form-item">
        <label for="site">Site:</label>
        <input
          name="site"
          v-model="form.site"
          type="text"
        />
        <br />
      </div>

      <button
        class="submit-btn"
        @click="submit"
      >Submit</button>
    </section>
  </div>
</template>
<script>
export default {
  name: "UserForm",
  data() {
    return {
      form: {
        name: "",
        email: "",
        site: ""
      }
    };
  },
  methods: {
    submit() {
      this.$emit("submit", Object.assign(this.form));
    }
  }
};
</script>
<style lang="css" scoped>

.user-form {
  color: #fff;
  width: 500px;
  margin: 10px auto;
  padding: 20px;
  border: 2px solid #fff;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.user-form .submit-btn {
  height: 30px;
  margin-top: 20px;
  cursor: pointer;
}

.form-item {
  margin: 10px 0;
  height: 40px;
  color: #fff;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.form-item input {
  height: 24px;
  font-size: 24px;
  line-height: 24px;
}
</style>

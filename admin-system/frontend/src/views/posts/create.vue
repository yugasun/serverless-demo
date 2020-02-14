<template>
  <div class="app-container">
    <el-form ref="postForm" :model="form" :rules="formRules" label-width="120px">
      <el-form-item label="Title" required prop="title">
        <el-input v-model="form.title" placeholder="please input title" />
      </el-form-item>
      <el-form-item label="Author" required prop="user_id">
        <el-select v-model="form.user_id" placeholder="please select author">
          <el-option v-for="user in userList" :key="user.id" :label="user.name" :value="user.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="Content" required prop="content">
        <el-input v-model="form.content" type="textarea" placeholder="please input content" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getList } from '@/api/user'
import { create as createPost } from '@/api/post'

export default {
  data() {
    return {
      form: {
        title: '',
        content: '',
        user_id: undefined
      },
      formRules: {
        title: [
          { required: true, message: 'please input title', trigger: 'blur' }
        ],
        content: [
          { required: true, message: 'please input content', trigger: 'blur' }
        ],
        user_id: [
          { required: true, message: 'please select author', trigger: 'blur' }
        ]
      },
      userList: []
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const { data } = await getList()
      this.userList = data.items || []
    },
    async onSubmit() {
      this.$refs.postForm.validate(async valid => {
        if (valid) {
          const res = await createPost(this.form)
          if (res.code === 0) {
            this.$message({
              message: 'Create success',
              type: 'success'
            })

            this.$refs.postForm.resetFields()
          }
        }
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>


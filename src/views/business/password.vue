<template>
  <div style="margin: 20px">
    <h1 style="text-align:center;">密码修改配置内容</h1>
    <el-form size="mini">
      <el-form-item label="用户名" label-width="120px">
        <el-input disabled v-model="user.username"></el-input>
      </el-form-item>
      <el-form-item label="图片地址" label-width="120px">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList">
          <el-button size="mini" type="primary" plain>添加图片</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="手机号码" label-width="120px">
        <el-input disabled v-model="user.phone"></el-input>
      </el-form-item>
      <el-form-item label="短信验证码" label-width="120px">
        <el-input v-model="user.code" style="width:500px;"></el-input>
        <el-button type="primary" plain>获取短信验证码</el-button>
      </el-form-item>
      <el-form-item label="新密码" label-width="120px">
        <el-input v-model="user.password"></el-input>
      </el-form-item>
    </el-form>
    <div style="text-align:center;">
      <el-button @click="submit" type="primary">确定</el-button>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'

export default {
  data() {
    return {
      user: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.getUser()
    },
    getUser(){
      request({
        url: "/user/one",
        method: "get",
      }).then(data => {
        this.user = data.data;
      })
    },
    submit(){
      request({
        url: "/user/password",
        method: "post",
        data: {
          password: this.user.password
        }
      }).then(res => {
        if (res.flag) {
          this.$message({
            type: "success",
            message: res.message
          })
          this.user.password = ""
        }
      })
    }
  }
}
</script>

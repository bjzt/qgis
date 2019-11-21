<template>
  <div style="margin: 20px">
    <h1 style="text-align:center;">密码修改配置内容</h1>
    <el-form size="mini">
      <el-row>
        <el-col :xs="24" :xl="8" :lg="12" :sm="12" :md="12">
          <el-form-item label="用户名" label-width="120px">
            <el-input disabled v-model="user.username"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="图片地址" label-width="120px">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          >
          <el-button size="mini" type="primary" plain>添加图片</el-button>
        </el-upload>
      </el-form-item>
      <el-row>
        <el-col :xs="24" :xl="8" :lg="12" :sm="12" :md="12">
          <el-form-item label="手机号码" label-width="120px">
            <el-input disabled v-model="user.phone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :xl="8" :lg="12" :sm="12" :md="12">  
          <el-form-item label="短信验证码" label-width="120px">
            <el-input v-model="user.code">
              <el-button type="primary" slot="append" plain @click="passwordCode">{{content}}</el-button>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :xl="8" :lg="12" :sm="12" :md="12">
          <el-form-item label="新密码" label-width="120px">
            <el-input v-model="user.password"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label-width="120px">
        <el-button @click="submit" type="primary">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request from '@/utils/request'

export default {
  data() {
    return {
      user: {},
      content: "获取短信验证码",
      canClick: true,
      codeTime: 60
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
    passwordCode(){
      if (!this.canClick) return;
      request({
        url: "/user/passwordCode",
        method: "get"
      }).then(res => {
        if (res.flag) {
          this.$message({
            type: "success",
            message: res.message
          })
        }
      })
      this.canClick = false
      this.content = this.codeTime + 's后重新发送'
      let clock = window.setInterval(() => {
        this.codeTime--
        this.content = this.codeTime + 's后重新发送'
        if (this.codeTime < 0) {     //当倒计时小于0时清除定时器
        window.clearInterval(clock)
          this.content = '重新发送验证码'
          this.codeTime = 60
          this.canClick = true
        }
      },1000);
      
    },
    submit(){
      request({
        url: "/user/password",
        method: "post",
        data: {
          password: this.user.password,
          code: this.user.code
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

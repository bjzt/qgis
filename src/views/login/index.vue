<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">系统登录</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          class="el-input-login"
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名/手机号/邮箱"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          class="el-input-login"
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="登录密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="dialogVisible=true"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button 
        :loading="loading" type="primary" 
        style="width:100%;margin-bottom:30px;" 
        @click.native.prevent="dialogVisible=true"
        >登录系统</el-button>
<!-- @click.native.prevent="handleLogin" -->
      <div class="tips">
        <!-- <span style="margin-right:20px;"><router-link to="register">新用户注册</router-link></span> -->
        <span style="margin-right:20px;"><router-link to="forget">忘记密码？</router-link></span>
      </div>

    </el-form>

    <el-dialog
      title="手机验证"
      :visible.sync="dialogVisible"
      width="300px"
      center>
      <el-form>
        <el-form-item>
          <el-input placeholder="请输入验证码" v-model="loginForm.code" size="mini"  @keyup.enter.native="handleLogin()">
            <el-button slot="append" @click="getCode" v-text="content"></el-button>
          </el-input>
          
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleLogin">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  name: 'Login',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: '',
        code: ""
      },
      canClick: true, //添加canClick
      codeTime: 60, //按钮的倒计时
      content: "发送验证码",
      dialogVisible: false,
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: "用户名不能为空" }],
        code: [{ required: true, trigger: 'blur', message: "验证码不能为空" }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    getCode(){
      if (this.loginForm.username == null || this.loginForm.username == "") {
        this.$message({
          type: "waring",
          message: "用户名不能为空"
        })
        return
      }
      if (!this.canClick) return;
      request({
        url: "/user/loginCode",
        method: 'post',
        data: this.loginForm
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
        this.codeTime --
        this.content = this.codeTime + 's后重新发送'
        if (this.codeTime < 0) {     //当倒计时小于0时清除定时器
        window.clearInterval(clock)
          this.content = '重新发送验证码'
          this.codeTime = 60
          this.canClick = true
        }
      },1000);
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('用户名密码错误')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
.el-dialog{
  .el-input {
    display: inline-table;
    width: 100%;
    input {
      color: black !important;
      caret-color: black;
      height: 40px !important;
    }
  }
}
/* reset element-ui css */
.login-container {
  .el-input-login {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>

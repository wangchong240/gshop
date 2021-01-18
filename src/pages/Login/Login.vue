<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:" :class="{on: loginType}" @click="setLoginType()">短信登录</a>
          <a href="javascript:" :class="{on: !loginType}" @click="setLoginType()">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login()">
          <div :class="{on: loginType}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="!rightPhone" class="get_verification" :class="{right_phone: rightPhone}" @click.prevent="getCode()">
                {{downTime === 0 ? '获取验证码' : `已发送(${downTime})s`}}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !loginType}">
            <section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="text" maxlength="8" placeholder="密码" v-if="isOnPassword" v-model="pwd">
                <input type="password" maxlength="8" placeholder="密码" v-else v-model="pwd">
                <div class="switch_button" :class="isOnPassword ? 'on' : 'off'" @click="switchPassword()">
                  <div class="switch_circle" :class="{'right': isOnPassword}"></div>
                  <span class="switch_text">{{isOnPassword ? 'abc' : '...'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" @click="getCaptcha($event)">
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
    <!--显示警告框-->
    <v-alert-tip :alert-text="alertText" @closeTip="closeTip()" v-show="showAlert"/>
  </section>
</template>

<script>
import AlertTip from '../../components/AlertTip/AlertTip'
import {reqSendCode} from '../../api/index'
// 倒计时时间
const COUNT_DOWN_TIME = 30

export default {
  name: 'Login',
  data () {
    return {
      loginType: true, // 登陆方式 true:手机登陆,false: 密码登陆
      phone: '', // 手机号
      code: '', // 手机验证码
      downTime: 0, // 倒计时时间
      isOnPassword: false, // 是否显示密码
      name: '', // 用户名
      pwd: '', // 是否显示密码
      captcha: '', // 图形验证码
      alertText: '', // 提示信息
      showAlert: false // 是否显示提醒框
    }
  },
  components: {
    'v-alert-tip': AlertTip
  },
  methods: {
    // 设置登陆方式
    setLoginType () {
      this.loginType = !this.loginType
    },
    // 切换密码显示隐藏
    switchPassword () {
      this.isOnPassword = !this.isOnPassword
    },
    // 获取验证码
    async getCode () {
      // 1.倒计时
      if (this.downTime === 0) {
        this.downTime = COUNT_DOWN_TIME
        this.intervalId = setInterval(() => {
          // 倒计时减1
          this.downTime = this.downTime - 1
          // 停止定时器
          if (this.downTime === 0) {
            // 停止定时器
            clearTimeout(this.intervalId)
          }
        }, 1000)
      }
      // 2.发送ajaxq请求
      if (this.downTime) {
        const result = await reqSendCode(this.phone)
        if (result.code === 1) {
          // 弹出警告框
          this.setAlertTip(result.msg)
          // 停止定时器
          clearInterval(this.intervalId)
          // 计时时间归零
          this.downTime = 0
          // 清空定时器ID
          this.intervalId = null
        }
      }
    },
    // 设置提示信息
    setAlertTip (alertText) {
      this.showAlert = true
      this.alertText = alertText
    },
    // 关闭提示框，传入组件中，主键负责调用
    closeTip () {
      this.alertText = ''
      this.showAlert = false
    },
    // 登陆
    login () {
      // 1.前台表单验证
      if (this.loginType) { // 手机验证码登陆
        const {rightPhone, code} = this
        if (!rightPhone) {
          // 手机号不正确
          this.setAlertTip('手机号不正确')
        } else if (!/^\d{6}$/.test(code)) {
          // 验证码不正确
          this.setAlertTip('验证码不正确')
        }
      } else { // 密码登陆
        const {name, pwd, captcha} = this
        if (!name) {
          // 用户名必须设置
          this.setAlertTip('用户名必须设置')
        } else if (!pwd) {
          // 密码必须设置
          this.setAlertTip('密码必须设置')
        } else if (!captcha) {
          // 验证码必须设置
          this.setAlertTip('验证码必须设置')
        }
      }
      // 2.后台登陆
    },
    // 获取验证码,图片不能使用ajax请求。并且每次请求路径不能一样。因此添加时间戳
    async getCaptcha ($event) {
      $event.target.src = 'http://localhost:4000/captcha?time=' + Date.now()
    }
  },
  computed: {
    rightPhone () {
      return /^1\d{10}$/.test(this.phone)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
.loginContainer
  width 100%
  height 100%
  background #fff

  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto

    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color #02a774
        text-align center

      .login_header_title
        padding-top 40px
        text-align center

        > a
          color #333
          font-size 14px
          padding-bottom 4px

          &:first-child
            margin-right 40px

          &.on
            color #02a774
            font-weight 700
            border-bottom 2px solid #02a774

    .login_content
      > form
        > div
          display none

          &.on
            display block

          input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial

            &:focus
              border 1px solid #02a774

          .login_message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff

            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent
              &.right_phone
                color black

          .login_verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff

            .switch_button
              font-size 12px
              border 1px solid #ddd
              border-radius 8px
              transition background-color .3s, border-color .3s
              padding 0 6px
              width 30px
              height 16px
              line-height 16px
              color #fff
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)

              &.off
                background #fff

                .switch_text
                  float right
                  color #ddd

              &.on
                background #02a774

              > .switch_circle
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0, 0, 0, .1)
                transition transform .3s
                &.right
                  transform translateX(30px)

          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px

            > a
              color #02a774

        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #4cd96f
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0

      .about_us
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999

    .go_back
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px

      > .iconfont
        font-size 20px
        color #999
</style>

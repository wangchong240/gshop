<template>
  <div id="app">
    <router-view></router-view>
    <v-footer v-if="$route.meta.showFooter"></v-footer>
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide'
export default {
  name: 'App',
  components: {
    'v-footer': FooterGuide
  },
  mounted () {
    // 加载地址
    this.$store.dispatch('getAddress')
    // 页面加载时，请求用户信息，实现自动登录
    this.$store.dispatch('getUserInfo')
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%
    background #f5f5f5
    position relative
</style>

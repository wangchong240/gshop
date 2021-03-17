import Vue from 'vue'
import {Button} from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueLazyload from 'vue-lazyload'
import loading from './common/imgs/loading.gif'
import App from './App'
import router from './router'
import store from './store'

// 在主文件中加载mockServer.js。只需加载即可，类似于导入样式
import './mock/mockServer'

// 全局注册mi-button,按需引入
Vue.component(Button.name, Button)
Vue.use(VueLazyload, {
  loading
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})

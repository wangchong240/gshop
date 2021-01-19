import Vue from 'vue'
import {Button} from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App'
import router from './router'
import store from './store'

// 全局注册mi-button,按需引入
Vue.component(Button.name, Button)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})

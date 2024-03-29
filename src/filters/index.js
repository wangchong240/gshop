import Vue from 'vue'
// import moment from 'moment'
import format from 'date-fns/format'
// 自定义过滤器
Vue.filter('date_format', function (value, formatStr='yyyy-MM-dd HH:mm:ss') {
  return format(value, formatStr)
})

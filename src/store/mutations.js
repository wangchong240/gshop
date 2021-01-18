/*
  直接操作state的方法
 */
import {RECEIVE_ADDRESS, RECEIVE_CATEGORIES, RECEIVE_SHOPS, RECEIVE_USER_INFO} from './mutation-types'

export default {
  [RECEIVE_ADDRESS] (store, {address}) {
    store.address = address
  },

  [RECEIVE_CATEGORIES] (store, {categories}) {
    store.categories = categories
  },

  [RECEIVE_SHOPS] (store, {shops}) {
    store.shops = shops
  },

  [RECEIVE_USER_INFO] (store, {userInfo}) {
    store.userInfo = userInfo
  }
}

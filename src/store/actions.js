/*
  直接提交mutations的方法
 */

import {reqAddress, reqCategories, reqShops} from '../api/index'
import {RECEIVE_ADDRESS, RECEIVE_CATEGORIES, RECEIVE_SHOPS, RECEIVE_USER_INFO} from './mutation-types'

export default {

  // 异步获取地址
  async getAddress ({commit, state}) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    commit(RECEIVE_ADDRESS, {address: result.data})
  },

  // 异步获取商品类别
  async getCategories ({commit}) {
    const result = await reqCategories()
    commit(RECEIVE_CATEGORIES, {categories: result.data})
  },

  // 异步获取商家列表
  async getShops ({commit, state}) {
    const {latitude, longitude} = state
    const result = await reqShops(longitude, latitude)
    commit(RECEIVE_SHOPS, {shops: result.data})
  },

  // 同步存入用户信息
  recordUser ({commit}, userInfo) {
    commit(RECEIVE_USER_INFO, {userInfo})
  }
}

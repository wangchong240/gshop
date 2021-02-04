/*
  直接提交mutations的方法
 */

import {
  reqAddress,
  reqCategories,
  reqShops,
  reqUser,
  reqLogout,
  reqShopGoods,
  reqShopRatings,
  reqShopInfo
} from '../api/index'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORIES,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_SHOP_RATINGS,
  RECEIVE_SHOP_INFO,
  RECEIVE_SHOP_GOODS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT
} from './mutation-types'

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
  },

  // 异步获取用户信息
  async getUserInfo ({commit}) {
    const result = await reqUser()
    if (result.code === 0) {
      const userInfo = result.data
      commit(RECEIVE_USER_INFO, {userInfo})
    }
  },

  // 退出登录
  async logout ({commit}) {
    const result = await reqLogout()
    if (result.code === 0) {
      commit(RESET_USER_INFO)
    }
  },

  // 异步请求商家信息
  async getShopInfo ({commit}) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      const shopInfo = result.data
      commit(RECEIVE_SHOP_INFO, {shopInfo})
    }
  },

  // 异步请求商家评价信息
  async getShopRatings ({commit}) {
    const result = await reqShopRatings()
    if (result.code === 0) {
      const shopRatings = result.data
      commit(RECEIVE_SHOP_RATINGS, {shopRatings})
    }
  },

  /**
   * 异步请求商家食物列表
   * @param commit vuex参数
   * @param callback 回调函数，用于初始化插件
   */
  async getShopGoods ({commit}, callback) {
    const result = await reqShopGoods()
    if (result.code === 0) {
      const shopGoods = result.data
      commit(RECEIVE_SHOP_GOODS, {shopGoods})
      // 如果传入回调函数，则执行
      callback && callback()
    }
  },

  /**
   * 同步更新food的count值
   */
  updateFoodCount ({commit}, {isAdd, food}) {
    if (isAdd) {
      commit(INCREMENT_FOOD_COUNT, food)
    } else {
      commit(DECREMENT_FOOD_COUNT, food)
    }
  }
}

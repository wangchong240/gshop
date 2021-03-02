/*
  直接操作state的方法
 */
import Vue from 'vue'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORIES,
  RECEIVE_SHOPS, RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_SHOP_GOODS,
  RECEIVE_SHOP_INFO,
  RECEIVE_SHOP_RATINGS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_SHOP_CART
} from './mutation-types'

export default {
  [RECEIVE_ADDRESS] (state, {address}) {
    state.address = address
  },

  [RECEIVE_CATEGORIES] (state, {categories}) {
    state.categories = categories
  },

  [RECEIVE_SHOPS] (state, {shops}) {
    state.shops = shops
  },

  [RECEIVE_USER_INFO] (state, {userInfo}) {
    state.userInfo = userInfo
  },

  [RESET_USER_INFO] (state) {
    state.userInfo = {}
  },

  [RECEIVE_SHOP_INFO] (state, {shopInfo}) {
    state.shopInfo = shopInfo
  },

  [RECEIVE_SHOP_GOODS] (state, {shopGoods}) {
    state.shopGoods = shopGoods
  },

  [RECEIVE_SHOP_RATINGS] (state, {shopRatings}) {
    state.shopRatings = shopRatings
  },

  [INCREMENT_FOOD_COUNT] (state, food) {
    if (!food.count) {
      // 原来food中，没有count属性，则需要调用vue.set() 方法，使其count属性能够双向绑定页面元素
      Vue.set(food, 'count', 1)
      // 添加购物车,第二次添加无需修改。应为是指定同一变量
      state.cartFoods.push(food)
    } else {
      food.count++
    }
  },

  [DECREMENT_FOOD_COUNT] (state, food) {
    // 防止快速点击，count出现负值
    if (food.count) {
      food.count--
      // 购物数量为零，移除商品
      if (food.count === 0) {
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
      }
    }
  },

  [CLEAR_SHOP_CART] (state) {
    // 将cartGoods中的食物count置零
    state.cartFoods.forEach(food => {food.count = 0})
    // 清空购物车中的数组
    state.cartFoods = [];
  }
}

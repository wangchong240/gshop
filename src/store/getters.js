/*
  state的计算属性
 */
export default {
  // 计算购物车中食物数量：preTotal（上一个求和值） food（数组中元素） 0（初始值）
  totalCount (state) {
    return state.cartFoods.reduce((preTotal, food) => preTotal + food.count, 0)
  },

  // 计算购物车中价格
  totalPrice (state) {
    return state.cartFoods.reduce((preTotal, food) => preTotal + food.price * food.count, 0)
  },

  // 计算评价中满意的数量
  positive (state) {
    return state.shopRatings.reduce((preTotal, rating) => preTotal + (rating.rateType === 0 ? 1 : 0), 0)
  }
}

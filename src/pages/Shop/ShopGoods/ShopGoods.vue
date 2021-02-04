<template>
  <div>
    <div class="goods">
      <!--食物类目-->
      <div class="menu-wrapper">
        <ul>
          <!--显示当前样式 -->
          <li class="menu-item" :class="{current: index === currentIndex}" v-for="(good, index) in shopGoods" :key="index" @click="clickMenuItem(index)">
            <span class="text bottom-border-1px">
              <img class="icon" v-if="good.icon" :src="good.icon"/>
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <!--食物列表-->
      <div class="foods-wrapper">
        <ul ref="foodsUl">
          <li class="food-list-hook" v-for="(good, index) in shopGoods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-if="good.foods" v-for="(food, index) in good.foods" :key="index">
                <div class="icon" @click="showFood(food)">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售 {{food.sellCount}} 份</span>
                    <span>好评率 {{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <v-cart-control :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <!--食物详情组件-->
    <v-food :food="currentFood" ref="currentFood"/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import BetterScroll from 'better-scroll'
import CartControl from '../../../components/CartControl/CartControl'
import Food from '../../../components/Food/Food'

export default {
  name: 'ShopGoods',
  data () {
    return {
      scrollY: 0, // 食物列表Y轴坐标，通过better-scroll收集
      tops: [], // 食物列表中分类li头部的坐标，在列表渲染之后就收集
      currentFood: {} //点击之后当前的食物，用于显示详情
    }
  },
  mounted () {
    this.$store.dispatch('getShopGoods', () => {
      // 列表数据渲染之后初始化better-scroll插件
      this.$nextTick(() => {
        // 初始化滑动条
        this._initScroll()
        // 初始化收集类目li的top的Y轴坐标
        this._initTops()
      })
    })
  },
  methods: {
    // 初始化滑动条，因为不是时间触动的方案，所以命名以‘_’开头
    _initScroll () {
      // 食物类目滚动
      new BetterScroll('.menu-wrapper', {})
      // 食物列表滚动
      this.foodsScroll = new BetterScroll('.foods-wrapper', {
        probeType: 2 // 因为惯性滑动，不触发scroll
      })
      // 食物列表滚动监听
      this.foodsScroll.on('scroll', ({x, y}) => {
        this.scrollY = Math.abs(y)
      })
      // 因为我scroll监听的probeType=2,惯性滑动，不会触发监听，因此，我们再绑定滑动结束的监听。
      this.foodsScroll.on('scrollEnd', ({x, y}) => {
        this.scrollY = Math.abs(y)
      })
    },
    // 初始化收集类目li的top的Y轴坐标
    _initTops () {
      // 食物列表中查找类目li
      const lis = this.$refs.foodsUl.getElementsByClassName('food-list-hook')
      // 遍历li数组，初始化tops
      let tops = []
      let top = 0
      tops.push(top)
      Array.prototype.slice.call(lis).forEach(li => {
        // 累加类目li的Y轴坐标
        top = top + li.clientHeight
        tops.push(top)
      })
      // 赋值
      this.tops = tops
    },
    // 单击goods菜单，滚动foods
    clickMenuItem (index) {
      //根据index,获取foods的tops对应的值，计算偏移量
      const scrollY = this.tops[index]
      //设置scrollY，立即改变goods菜单选中样式
      this.scrollY = scrollY
      //手动平滑滚动foods列表
      this.foodsScroll.scrollTo(0, -scrollY, 300)
    },
    // 显示食物详情
    showFood(food) {
      // 设置当前食物
      this.currentFood = food
      // 显示食物详情：父组件调用子组件的方法
      this.$refs.currentFood.toggleFood()
    }
  },
  computed: {
    ...mapState(['shopGoods']),
    // 计算属性，根据scrollY值与tops计算当前食物列表滚动到什么位置。注意tops的长度及下标，与goods数组的长度与下标一致
    currentIndex () {
      // 计算条件，scrollY、tops
      const {scrollY, tops} = this
      // 计算逻辑：scrollY >= currentTop && scrollY < nextTop;返回tops符合条件的数组下标
      return tops.findIndex((top, index) => {
        return scrollY >= top && scrollY < tops[index + 1]
      })
    }
  },
  components: {
    'v-cart-control': CartControl,
    'v-food': Food
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../../common/stylus/mixins.styl"
.goods
  display: flex
  position: absolute
  top: 195px
  bottom: 46px
  width: 100%
  background: #fff;
  overflow: hidden
  .menu-wrapper
    flex: 0 0 80px
    width: 80px
    background: #f3f5f7
    .menu-item
      display: table
      height: 54px
      width: 56px
      padding: 0 12px
      line-height: 14px
      &.current
        position: relative
        z-index: 10
        margin-top: -1px
        background: #fff
        color: $green
        font-weight: 700
        .text
          border-none()
      .icon
        display: inline-block
        vertical-align: top
        width: 12px
        height: 12px
        margin-right: 2px
        background-size: 12px 12px
        background-repeat: no-repeat
      .text
        display: table-cell
        width: 56px
        vertical-align: middle
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        font-size: 12px
  .foods-wrapper
    flex: 1
    .title
      padding-left: 14px
      height: 26px
      line-height: 26px
      border-left: 2px solid #d9dde1
      font-size: 12px
      color: rgb(147, 153, 159)
      background: #f3f5f7
    .food-item
      display: flex
      margin: 18px
      padding-bottom: 18px
      bottom-border-1px(rgba(7, 17, 27, 0.1))
      &:last-child
        border-none()
        margin-bottom: 0
      .icon
        flex: 0 0 57px
        margin-right: 10px
      .content
        flex: 1
        .name
          margin: 2px 0 8px 0
          height: 14px
          line-height: 14px
          font-size: 14px
          color: rgb(7, 17, 27)
        .desc, .extra
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)
        .desc
          line-height: 12px
          margin-bottom: 8px
        .extra
          .count
            margin-right: 12px
        .price
          font-weight: 700
          line-height: 24px
          .now
            margin-right: 8px
            font-size: 14px
            color: rgb(240, 20, 20)
          .old
            text-decoration: line-through
            font-size: 10px
            color: rgb(147, 153, 159)
        .cartcontrol-wrapper
          position: absolute
          right: 0
          bottom: 12px
</style>

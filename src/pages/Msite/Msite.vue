<template>
  <div>
    <section class="msite">
      <!--首页头部-->
      <v-header-top :title="address.name">
        <template v-slot:left>
          <span class="header_search">
            <i class="iconfont icon-sousuo"></i>
          </span>
        </template>
        <template v-slot:right>
          <router-link class="header_login" slot="right" :to="userInfo._id ? '/userinfo': '/login'">
            <span class="header_login_text" v-if="!userInfo._id">
              登录|注册
            </span>
            <span class="header_login_text" v-else>
              <i class="iconfont icon-person"></i>
            </span>
          </router-link>

        </template>
      </v-header-top>
      <!--首页导航-->
      <nav class="msite_nav">
        <div class="swiper-container" v-if="categories.length">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(categories, index) in categoryArray" :key="index">
              <a href="javascript:" class="link_to_food" v-for="(category, index) in categories" :key="index">
                <div class="food_container">
                  <img :src="imgBaseUrl + category.image_url" :alt="category.description">
                </div>
                <span>{{ category.title }}</span>
              </a>
            </div>
          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>
        <img src="./images/msite_back.svg" alt="back" v-else>
      </nav>
      <!--首页附近商家-->
      <div class="msite_shop_list">
        <div class="shop_header">
          <i class="iconfont icon-xuanxiang"></i>
          <span class="shop_header_title">附近商家</span>
        </div>
        <v-shop-list></v-shop-list>
      </div>
    </section>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Swiper from 'swiper'
import 'swiper/css/swiper.css'

import HeaderTop from '../../components/HeaderTop/HeaderTop'
import ShopList from '../../components/ShopList/ShopList'

export default {
  name: 'Msite',
  components: {
    'v-header-top': HeaderTop,
    'v-shop-list': ShopList
  },
  data () {
    return {
      imgBaseUrl: 'https://fuss10.elemecdn.com'
    }
  },
  mounted () {
    this.$store.dispatch('getCategories')
  },
  computed: {
    ...mapState(['address', 'categories', 'userInfo']),
    // 因为轮播图，需要二维数组，且小数组中最大长度为8
    categoryArray () {
      const {categories} = this
      const array = []
      let minArray = []
      categories.forEach(c => {
        // 小数组最大长度为8
        if (minArray.length === 8) {
          minArray = []
        }
        // 放入大数组
        if (minArray.length === 0) {
          array.push(minArray)
        }
        // 元素放入小数组中
        minArray.push(c)
      })
      return array
    }
  },
  watch: {
    // 监控数据更新之后，dom元素渲染完成后，创建轮播对象。否则时机太早，无法正确显示分页
    categories (newValue, oldValue) {
      // 一旦完成界面更新，立即调用回调函数。（此条语句一定要写在数据更新之后）
      this.$nextTick(() => {
        new Swiper('.swiper-container', {
          loop: true,
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination'
          }
        })
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
.msite //首页
  width 100%

  .msite_nav
    bottom-border-1px(#e4e4e4)
    margin-top 45px
    height 200px
    background #fff

    .swiper-container
      width 100%
      height 100%

      .swiper-wrapper
        width 100%
        height 100%

        .swiper-slide
          display flex
          justify-content center
          align-items flex-start
          flex-wrap wrap

          .link_to_food
            width 25%

            .food_container
              display block
              width 100%
              text-align center
              padding-bottom 10px
              font-size 0

              img
                display inline-block
                width 50px
                height 50px

            span
              display block
              width 100%
              text-align center
              font-size 13px
              color #666

      .swiper-pagination
        > span.swiper-pagination-bullet-active
          background #02a774
</style>

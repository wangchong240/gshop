<template>
  <div class="star" :class="'star-'+size">
    <span class="star-item" v-for="(sc, index) in starClass" :class="sc" :key="index"></span>
  </div>
</template>

<script>
//类名常量
const CLASS_ON = 'on';
const CLASS_HALF = 'half';
const CLASS_OFF = 'off';

export default {
  name: 'Star',
  props: {
    score: Number,
    size: Number
  },
  computed: {
    starClass() {
      const {score} = this;
      //样式数组：‘on’,'half','off'
      const starClassArray = [];
      const scoreInteger = Math.floor(score);
      //添加‘on’样式
      for (let i = 0; i < scoreInteger; i++) {
        starClassArray.push(CLASS_ON);
      }
      //添加‘half'样式
      if(score * 10 % 10 >= 5) {
        starClassArray.push(CLASS_HALF);
      }
      //添加’off‘样式
      while(starClassArray.length < 5) {
        starClassArray.push(CLASS_OFF);
      }

      return starClassArray;
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
.star //2x图 3x图
  float left
  font-size 0

  .star-item
    display inline-block
    background-repeat no-repeat

  &.star-48
    .star-item
      width 20px
      height 20px
      margin-right 22px
      background-size 20px 20px

      &:last-child
        margin-right: 0

      &.on
        bg-image('./images/star48_on')

      &.half
        bg-image('./images/star48_half')

      &.off
        bg-image('./images/star48_off')

  &.star-36
    .star-item
      width 15px
      height 15px
      margin-right 6px
      background-size 15px 15px

      &:last-child
        margin-right 0

      &.on
        bg-image('./images/star36_on')

      &.half
        bg-image('./images/star36_half')

      &.off
        bg-image('./images/star36_off')

  &.star-24
    .star-item
      width 10px
      height 10px
      margin-right 3px
      background-size 10px 10px

      &:last-child
        margin-right 0

      &.on
        bg-image('./images/star24_on')

      &.half
        bg-image('./images/star24_half')

      &.off
        bg-image('./images/star24_off')

</style>

/*
  使用mockjs提供mock数据接口,mock模块无需暴露，即无需export default.
  因为，Mock模块是通过Mockjs拦截ajax,模拟返回数据。因此只需加载mockServer.js即可。应在main.js加载即可
 */
import data from './data.json'
import Mock from 'mockjs'

// 返回商家食物goods的接口
Mock.mock('/goods', {code: 0, data: data.goods})
// 返回商家评价ratings的接口
Mock.mock('/ratings', {code: 0, data: data.ratings})
// 返回商家信息info的接口
Mock.mock('/info', {code: 0, data: data.info})

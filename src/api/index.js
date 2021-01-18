/*
  后台交互模块
 */
import Ajax from './ajax'

const BASE_URL = '/api'
// 1、根据经纬度获取位置详情
export const reqAddress = (geohash) => Ajax(BASE_URL + '/position/' + geohash)
// 2、获取食品分类列表
export const reqCategories = () => Ajax(BASE_URL + '/index_category')
// 3、根据经纬度获取商铺列表
export const reqShops = (longitude, latitude) => Ajax(BASE_URL + '/shops', {longitude, latitude})
// 4、根据经纬度和关键字搜索商铺列表
export const reqSearchShops = (geohash, keyword) => Ajax(BASE_URL + '/search_shops', {geohash, keyword})
// 6、用户名密码登陆
export const reqLoginPwd = ({name, pwd, captcha}) => Ajax(BASE_URL + '/login_pwd', {name, pwd, captcha}, 'POST')
// 7、发送短信验证码
export const reqSendCode = (phone) => Ajax(BASE_URL + '/sendcode', {phone})
// 8、手机号验证码登陆
export const reqLoginSms = (phone, code) => Ajax(BASE_URL + '/login_sms', {phone, code}, 'POST')
// 9、根据会话获取用户信息
export const reqUser = () => Ajax(BASE_URL + '/userinfo')
// 10、用户登出
export const reqLogout = () => Ajax(BASE_URL + '/logout')

/*
  ajax请求数据模块
 */
import Axios from 'axios'

/**
 * 异步请求函数封装
 * @param url 请求路径
 * @param data 请求数据
 * @param type 请求方式，默认值：Get
 */
export default function ajax (url, data = {}, type = 'GET') {
  return new Promise(function (resolve, reject) {
    let promise;
    //1.发送ajax请求
    if (type === 'GET') {
      // 准备 url query 参数数据
      let dataStr = ''; // 数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&';
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'));
        url = url + '?' + dataStr;
      }
      promise = Axios.get(url);
    } else {
      promise = Axios.post(url, data);
    }

    //2.返回结果封装
    promise.then(response => {
      resolve(response.data);
    }).catch(error => {
      reject(error);
    });
  })
}

// import Cookies from 'js-cookie'

export function getToken(TokenKey) {
    // return Cookies.get(TokenKey)
    return window.sessionStorage.getItem(TokenKey)
}

export function setToken(TokenKey, token) {
    // return Cookies.set(TokenKey, token)
    return window.sessionStorage.setItem(TokenKey, token)
}

export function removeToken(TokenKey) {
    // return Cookies.remove(TokenKey)
    return window.sessionStorage.removeItem(TokenKey)
}

export function clearToken() {
    return window.sessionStorage.clear()
}

// 非插件cookie的方法
// key 为cookie的名称， val 为cookie的值，time为过期时间（单位为秒）
export function setCookie(key,val,time) {
  if (typeof key !== 'string' || typeof val !== 'string') {
    return false;
  }

  time = time || 7*24*3600;
  let exp = new Date();
  exp.setTime(exp.getTime() + time * 1000);
  if( time > 0 ) {
    document.cookie = key + '=' + val + ';expires=' + exp.toGMTString();
  }else {
    document.cookie = key + '=' + val + ';expires=' + exp.toGMTString();
    // let herf = window.location.href
    // if(herf.includes(".test.ybm100.com")) {
      document.cookie = key + '=' + val + ';domain='+ '.bttech.com.cn' + ';expires=' + exp.toGMTString();
    // } else if(herf.includes(".ybm100.com")) {
      document.cookie = key + '=' + val + ';domain='+ '.bttech.com.cn' + ';expires=' + exp.toGMTString();
    // }
  }
}

// 获取所有的cookie
function getAllCookies() {
  let cookies = document.cookie.split(/;\s/g);
  let cookieObj = {};
  cookies.forEach((item) => {
    let key = item.split('=')[0];
    cookieObj[key] = item.split('=')[1];
  });
  return cookieObj;
}

// 通过key来获取cookie，
export function getCookieByKey(key) {
  return getAllCookies()[key]
}

// 通过key来删除cookie
export function clearCookieByKey(key) {
  setCookie(key,'',-1)
}

// 清除所有的cookie
export function clearAllCookies() {
  let keys = Object.keys(getAllCookies());
  keys.forEach((item) => {
    clearCookieByKey(item);
  })
}
// 清除所有各个域名下的cookie
export function delCookie () {
  var keys = document.cookie.match(/[^ =;]+(?==)/g)
  if (keys) {
    for (var i = keys.length; i--;) {
      document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString() // 清除当前域名下的,例如：m.ratingdog.cn
      document.cookie = keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString() // 清除当前域名下的，例如 .m.ratingdog.cn
      document.cookie = keys[i] + '=0;path=/;domain=bttech.com.cn;expires=' + new Date(0).toUTCString() // 清除一级域名下的或指定的，例如 .ratingdog.cn
    }
  }
}

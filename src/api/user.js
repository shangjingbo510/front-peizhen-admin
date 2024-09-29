import request from '@/utils/request'

//登录
export function login(data) {
    return request({
        url: '/login/login',
        method: 'POST',
        data
    })
}

//退出
export function logout() {
    return request({
        url: '/login/loginOut',
        method: 'POST'
    })
}

//获取菜单
export function getMenu() {
    return request({
        url: '/userMenuAuth/getMenu',
        method: 'POST'
    })
}

//根据用户名获取手机号
export function ssoGetMobile(data) {
    return request({
        url: '/sso/getMobile',
        method: 'POST',
        data
    })
}

//发送短信验证码
export function sendSms(data) {
    return request({
        url: '/forget/sendSms',
        method: 'POST',
        data
    })
}

//邮箱验证
export function sendMail(data) {
    return request({
        url: '/pwd/change/sendMail',
        method: 'POST',
        data
    })
}

//校验短信验证码
export function verifySms(data) {
    return request({
        url: '/forget/verifySms',
        method: 'POST',
        data
    })
}

//获取修改密码方式
export function getChangePwdMode(data) {
    return request({
        url: '/pwd/change/mode',
        method: 'POST',
        data
    })
}

//提交修改密码
export function resetPasswordSubmit(data) {
    return request({
        url: '/forget/updatePassword',
        method: 'POST',
        data
    })
}

//登录后修改密码
export function changePasswordSubmit(data) {
    return request({
        url: '/setting/updatePassword',
        method: 'POST',
        data
    })
}

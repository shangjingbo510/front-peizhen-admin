import request from '@/utils/request'

//查询渠道列表
export function getChannelList(data) {
    return request({
        url: '/channel/list',
        method: 'POST',
        data: data
    })
}

//查询渠道详细信息
export function getChannelDetail(data) {
    return request({
        url: '/channel/get',
        method: 'POST',
        data: data
    })
}

//新增渠道
export function insertChannel(data) {
    return request({
        url: '/channel/insert',
        method: 'POST',
        data: data
    })
}

//查询省列表
export function listProvince(data) {
    return request({
        url: '/base/address/listProvince',
        method: 'POST',
        data: data
    })
}

//更新渠道
export function updateChannel(data) {
    return request({
        url: '/channel/update',
        method: 'POST',
        data: data
    })
}

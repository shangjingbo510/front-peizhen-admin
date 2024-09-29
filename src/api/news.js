import request from '@/utils/request'

//列表
export function informationList(data) {
    return request({
        url: '/information/list',
        method: 'POST',
        data
    })
}

//添加
export function informationAdd(data) {
    return request({
        url: '/information/add',
        method: 'POST',
        data
    })
}

//更新
export function informationUpdate(data) {
    return request({
        url: '/information/update',
        method: 'POST',
        data
    })
}

//更新状态
export function informationUpdateStatus(data) {
    let formData = new FormData();
    Object.keys(data).forEach(item => {
        formData.append(item, data[item]);
    })
    return request({
        url: '/information/updateStatus',
        method: 'POST',
        data: formData
    })
}

//删除
export function informationDelete(id) {
    return request({
        url: '/information/delete/' + id,
        method: 'POST'
    })
}

//详情
export function informationDetail(id) {
    return request({
        url: '/information/detail/' + id,
        method: 'POST'
    })
}
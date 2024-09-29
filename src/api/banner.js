import request from '@/utils/request'

//列表
export function bannerList(data) {
    return request({
        url: '/banner/list',
        method: 'POST',
        data
    })
}

//添加
export function bannerAdd(data) {
    return request({
        url: '/banner/add',
        method: 'POST',
        data
    })
}

//更新
export function bannerUpdate(data) {
    return request({
        url: '/banner/update',
        method: 'POST',
        data
    })
}

//更新状态
export function bannerUpdateStatus(data) {
    let formData = new FormData();
    Object.keys(data).forEach(item => {
        formData.append(item, data[item]);
    })
    return request({
        url: '/banner/updateStatus',
        method: 'POST',
        data: formData
    })
}

//删除
export function bannerDelete(id) {
    return request({
        url: '/banner/delete/' + id,
        method: 'POST'
    })
}

//详情
export function bannerDetail(id) {
    return request({
        url: '/banner/detail/' + id,
        method: 'POST'
    })
}
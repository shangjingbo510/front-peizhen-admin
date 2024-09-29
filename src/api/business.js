import request from '@/utils/request'

//添加业务
export function businessAdd(data) {
    return request({
        url: '/business/add',
        method: 'POST',
        data
    })
}

//业务列表
export function businessList(data) {
    return request({
        url: '/business/list',
        method: 'POST',
        data
    })
}

//更新业务
export function businessUpdate(data) {
    return request({
        url: '/business/update',
        method: 'POST',
        data
    })
}

//更新业务状态
export function businessUpdateStatus(data) {
    let formData = new FormData();
    Object.keys(data).forEach(item => {
        formData.append(item, data[item]);
    })
    return request({
        url: '/business/updateStatus',
        method: 'POST',
        data: formData
    })
}

//业务删除
export function businessDelete(id) {
    return request({
        url: '/business/delete/' + id,
        method: 'POST'
    })
}

//业务详情
export function businessDetail(id) {
    return request({
        url: '/business/detail/' + id,
        method: 'POST'
    })
}
import request from '@/utils/request'

//添加客户
export function customAdd(data) {
    return request({
        url: '/customerManage/add',
        method: 'POST',
        data
    })
}

//客户列表
export function customList(data) {
    return request({
        url: '/customerManage/list',
        method: 'POST',
        data
    })
}

//更新客户
export function customUpdate(data) {
    return request({
        url: '/customerManage/update',
        method: 'POST',
        data
    })
}

//客户删除
export function customDelete(id) {
    return request({
        url: '/customerManage/delete/' + id,
        method: 'POST'
    })
}

//客户详情
export function customDetail(id) {
    return request({
        url: '/customerManage/detail/' + id,
        method: 'POST'
    })
}

//客户审核
export function customAudit(data) {
    return request({
        url: '/customerManage/audit',
        method: 'POST',
        data
    })
}
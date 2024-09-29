import request from '@/utils/request'

//添加专家
export function expertAdd(data) {
    return request({
        url: '/expertManage/add',
        method: 'POST',
        data
    })
}

//专家列表
export function expertList(data) {
    return request({
        url: '/expertManage/list',
        method: 'POST',
        data
    })
}

//更新专家
export function expertUpdate(data) {
    return request({
        url: '/expertManage/update',
        method: 'POST',
        data
    })
}

//专家删除
export function expertDelete(id) {
    return request({
        url: '/expertManage/delete/' + id,
        method: 'POST'
    })
}

//专家详情
export function expertDetail(id) {
    return request({
        url: '/expertManage/detail/' + id,
        method: 'POST'
    })
}

//推荐、取消推荐专家
export function expertRecommend(data) {
    return request({
        url: '/expertManage/recommend',
        method: 'POST',
        data
    })
}

//专家审核
export function expertAudit(data) {
    return request({
        url: '/expertManage/audit',
        method: 'POST',
        data
    })
}

//专家合同详情
export function expertSignDetail(id) {
    return request({
        url: '/expertManage/signDetail/' + id,
        method: 'POST'
    })
}

//专家合同上传
export function expertSign(data) {
    return request({
        url: '/expertManage/sign',
        method: 'POST',
        data
    })
}

//批量导入专家合伙人
export function batchImportExpert(data) {
    let formData = new FormData();
    Object.keys(data).forEach(item => {
        formData.append(item, data[item]);
    })
    return request({
        url: '/expertManage/batchImportPartner',
        method: 'POST',
        data: formData
    })
}

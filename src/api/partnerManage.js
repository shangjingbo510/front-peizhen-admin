import request from '@/utils/request'

//添加合伙人
export function partnerAdd(data) {
    return request({
        url: '/partnerManage/add',
        method: 'POST',
        data
    })
}

//合伙人列表
export function partnerList(data) {
    return request({
        url: '/partnerManage/list',
        method: 'POST',
        data
    })
}

//更新合伙人
export function partnerUpdate(data) {
    return request({
        url: '/partnerManage/update',
        method: 'POST',
        data
    })
}

//合伙人删除
export function partnerDelete(id) {
    return request({
        url: '/partnerManage/delete/' + id,
        method: 'POST'
    })
}

//合伙人详情
export function partnerDetail(id) {
    return request({
        url: '/partnerManage/detail/' + id,
        method: 'POST'
    })
}

//合伙人审核
export function partnerAudit(data) {
    return request({
        url: '/partnerManage/audit',
        method: 'POST',
        data
    })
}

//编辑合伙人级别
export function partnerUpdateLevel(data) {
    return request({
        url: '/partnerManage/updateLevel',
        method: 'POST',
        data
    })
}

//合伙人合同详情
export function partnerSignDetail(id) {
    return request({
        url: '/partnerManage/signDetail/' + id,
        method: 'POST'
    })
}

//合伙人合同上传
export function partnerSign(data) {
    return request({
        url: '/partnerManage/sign',
        method: 'POST',
        data
    })
}

//查询推荐人列表
export function getRecommendPartnerList(data) {
    let formData = new FormData();
    Object.keys(data).forEach(item => {
        formData.append(item, data[item]);
    })
    return request({
        url: '/partnerManage/getRecommendPartnerList',
        method: 'POST',
        data: formData
    })
}

//批量导入合伙人
export function batchImportPartner(data) {
    let formData = new FormData();
    Object.keys(data).forEach(item => {
        formData.append(item, data[item]);
    })
    return request({
        url: '/partnerManage/batchImportPartner',
        method: 'POST',
        data: formData
    })
}
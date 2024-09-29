import request from '@/utils/request'
let baseUrl = process.env.VUE_APP_BASE_API;

//查询机构
export function queryOrgList(data) {
    return request({
        url: '/org/list',
        method: 'POST',
        data: data
    })
}

//添加机构
export function orgAdd(data) {
    return request({
        url: '/org/add',
        method: 'POST',
        data: data
    })
}

//修改机构
export function orgUpdate(data) {
    return request({
        url: '/org/update',
        method: 'POST',
        data: data
    })
}

//删除机构
export function orgRemove(id) {
    return request({
        url: '/org/delete/' + id,
        method: 'POST'
    })
}

//导出机构
export function orgExport() {
    return baseUrl + "/org/export"
}


// 获取上级机构
export function getParentOrgList(data) {
    return request({
        url: '/initPage/initSuperOrg',
        method: 'POST',
        data: data
    })
}
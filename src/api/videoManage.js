import request from '@/utils/request'

//------------------------------分类管理-------------------------
//分类列表
export function schoolCategoryList(data) {
    return request({
        url: '/school/category/list',
        method: 'POST',
        data
    })
}

//添加分类
export function schoolCategoryAdd(data) {
    return request({
        url: '/school/category/add',
        method: 'POST',
        data
    })
}

//更新分类
export function schoolCategoryUpdate(data) {
    return request({
        url: '/school/category/update',
        method: 'POST',
        data
    })
}

//删除分类
export function schoolCategoryDelete(id) {
    return request({
        url: '/school/category/delete/' + id,
        method: 'POST'
    })
}

//分类详情
export function schoolCategoryDetail(id) {
    return request({
        url: '/school/category/detail/' + id,
        method: 'POST'
    })
}

//------------------------------视频管理-------------------------
//视频列表
export function schoolVideoList(data) {
    return request({
        url: '/school/video/list',
        method: 'POST',
        data
    })
}

//添加视频
export function schoolVideoAdd(data) {
    return request({
        url: '/school/video/add',
        method: 'POST',
        data
    })
}

//更新视频
export function schoolVideoUpdate(data) {
    return request({
        url: '/school/video/update',
        method: 'POST',
        data
    })
}

//更新状态
export function schoolVideoUpdateStatus(data) {
    let formData = new FormData();
    Object.keys(data).forEach(item => {
        formData.append(item, data[item]);
    })
    return request({
        url: '/school/video/updateStatus',
        method: 'POST',
        data: formData
    })
}

//删除视频
export function schoolVideoDelete(id) {
    return request({
        url: '/school/video/delete/' + id,
        method: 'POST'
    })
}

//视频详情
export function schoolVideoDetail(id) {
    return request({
        url: '/school/video/detail/' + id,
        method: 'POST'
    })
}
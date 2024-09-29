import request from "@/utils/request";
let baseUrl = process.env.VUE_APP_BASE_API;

//---------------------------权限管理-用户管理-------------------------------------
//添加
export function addUser(data) {
    return request({
        url: "/user/add",
        method: "POST",
        data: data
    });
}

//更新
export function updateUser(data) {
    return request({
        url: "/user/update",
        method: "POST",
        data: data
    });
}

//查询用户列表
export function userList(data) {
    return request({
        url: "/user/list",
        method: "POST",
        data: data
    });
}

//导出文件
export function userListExport() {
    return baseUrl + "/user/export";
}

//获取机构列表
export function queryOrgAll(data) {
    return request({
        url: "/base/queryOrg/all",
        method: "POST",
        data: data
    });
}

//---------------------------权限管理-菜单管理-------------------------------------
//增加菜单
export function menuAdd(data) {
    return request({
        url: "/menu/add",
        method: "POST",
        data: data
    });
}
//编辑菜单
export function menuUpdate(data) {
    return request({
        url: "/menu/update",
        method: "POST",
        data: data
    });
}

//菜单列表
export function menuList(data) {
    return request({
        url: "/menu/list",
        method: "POST",
        data: data
    });
}

//删除菜单
export function menuDelete(menuId) {
    return request({
        url: "/menu/delete/" + menuId,
        method: "POST"
    });
}

//菜单详情
export function menuDetail(menuId) {
    return request({
        url: "/menu/detail/" + menuId,
        method: "POST"
    });
}

//根据菜单id查询菜单
export function queryMenuByGroupId(id) {
    return request({
        url: "/menu/query/" + id,
        method: "POST"
    });
}

//---------------------------权限管理-角色管理、用户角色分配-------------------------------------
//增加角色
export function roleAdd(data) {
    return request({
        url: "/role/add",
        method: "POST",
        data
    });
}

//角色列表
export function getRoleList(data) {
    return request({
        url: "/role/getRoleList",
        method: "POST",
        data
    });
}

//删除角色
export function roleDelete(id) {
    return request({
        url: "/role/delete/" + id,
        method: "POST"
    });
}

//查询菜单树
export function getMenuTree(data) {
    return request({
        url: "/role/getMenuTree",
        method: "POST",
        data
    });
}

//用户修改角色
export function modifyUserRole(data) {
    return request({
        url: "/role/modifyUserRole",
        method: "POST",
        data
    });
}

//根据用户id查询角色
export function queryRoleByUserId(userId) {
    return request({
        url: "/role/queryRoleByUserId/" + userId,
        method: "POST"
    });
}

//根据角色ID查询用户
export function queryUserByRoleId(data) {
    return request({
        url: "/role/queryUserByRoleId",
        method: "POST",
        data
    });
}

//移除用户角色
export function removeUserRole(data) {
    return request({
        url: "/role/removeUserRole",
        method: "POST",
        data
    });
}

//编辑角色
export function roleUpdate(data) {
    return request({
        url: "/role/update",
        method: "POST",
        data
    });
}
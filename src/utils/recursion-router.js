/**
 *
 * @param  {Array} userRouter 后台返回的用户权限json
 * @param  {Array} allRouter  前端配置好的所有动态路由的集合
 * @param {*} matchFlag  是否路由权限匹配动态加载 否则加载本地全部路由
 * @return {Array} realRoutes 过滤后的路由
 */

export function recursionRouter(userRouter = [], allRouter = [], matchFlag = true) {
    var realRoutes = [];
    if (!matchFlag) return allRouter
    allRouter.forEach((v, i) => {
        userRouter.forEach((item, index) => {
            if (item.menuName === v.meta.title) {
                if (item.childList && item.childList.length > 0) {
                    v.children = recursionRouter(item.childList, v.children);
                }
                realRoutes.push(v);
            }
        });
    });
    return realRoutes;
}

/**
 *
 * @param {Array} routes 用户过滤后的路由
 *
 * 递归为所有有子路由的路由设置第一个children.path为默认路由
 */
export function setDefaultRoute(routes) {
    routes.forEach((v, i) => {
        if (v.children && v.children.length > 0) {
            v.redirect = { name: v.children[0].name };
            setDefaultRoute(v.children);
        }
    });
}

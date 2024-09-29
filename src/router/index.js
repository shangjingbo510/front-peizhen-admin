// import Vue from 'vue';
// import VueRouter from 'vue-router';

// Vue.use(VueRouter);
import Layout from '@/views/layout/index'
import NotFound from '@/views/404'

//以下代码解决点击两次相同路由地址重复的报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location)
}

/* 初始路由 */
const createRouter = () => new VueRouter({
    routes: [
        {
            path: '/login',
            component: () => import ('@/views/login/index')
        }
    ]
})
const router = createRouter()
export default router

// 重置路由，切换用户后，或者退出时清除动态加载的路由
export function resetRouter() {
    const newRouter = createRouter()
    // 新路由实例matcer，赋值给旧路由实例的matcher，（相当于replaceRouter）
    router.matcher = newRouter.matcher
}

/* 准备动态添加的路由 */
export const initRoutes = [
    {
        path: '/',
        redirect: '',
        component: Layout,
        name: 'Container',
        meta: {title: '人和家办管理系统'},
        children: []
    },
    {
        path: '*',
        component: NotFound
    }
]

// ***** 是否路由权限匹配动态加载 (Matched Permission Route) *****
// 默认true根据权限匹配 本地开发可以设为false则显示全部菜单路由 请勿改动此配置提交发布
export const MPR = true
